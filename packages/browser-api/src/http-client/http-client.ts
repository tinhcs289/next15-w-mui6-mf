export type BaseAuthData = {
  accessToken: string;
  refreshToken: string;
  [x: string]: any;
};

export interface FetchInterceptorsHandler<
  T extends BaseAuthData = BaseAuthData,
> {
  setIsRefreshingInOtherTabs?: (isRefreshing: boolean) => void;

  getAccessToken: () => string | null | undefined;
  getRefreshToken: () => string | null | undefined;
  getAcceptLanguage?: (data?: T) => string | null | undefined;

  onRefreshToken: (payload: {
    refreshToken: string;
    fetchInstance: HttpClient;
  }) => Promise<T | null | undefined>;

  onRefreshTokenFail: () => void;
  onForceLogout?: () => void;
  onUpdateAuth: (newAuth: T) => void;

  onError?: (
    type:
      | "network-error"
      | "time-out"
      | "internal-server-error"
      | "bad-request"
      | "not-found"
      | "forbidden"
      | "other",
    error?: any
  ) => void;
}

type RequestConfig = RequestInit & {
  url: string;
};

type RequestOptions = Omit<RequestInit, "url" | "method" | "body" | "signal"> & {
  payload?: BodyInit | Object | null;
  queryString?: Record<string, any>;
  cancelKey?: string;
};

/**
 * @example
  // define instance
  const http = new HttpClient({
    baseURL: "/api",
    handler: {
      getAccessToken: () => localStorage.getItem("access_token"),
      getRefreshToken: () => localStorage.getItem("refresh_token"),
      getAcceptLanguage: () => localStorage.getItem("lang") || "vi",
      onRefreshToken: async ({ refreshToken, fetchInstance }) =>
        fetchInstance.post<MyAuth>("/auth/refresh", { refreshToken }),
      onUpdateAuth: (newAuth) => {
        localStorage.setItem("access_token", newAuth.accessToken);
        localStorage.setItem("refresh_token", newAuth.refreshToken);
      },
      onRefreshTokenFail: () => {
        localStorage.clear();
        window.location.href = "/login";
      },
      onForceLogout: () => {
        localStorage.clear();
        window.location.href = "/login";
      },
      onError: (type, error) => {
        console.error("[HTTP ERROR]", type, error);
      },
    },
  });

  // cancelable request example
  let currentKey = "search-users";
  async function searchUsers(keyword: string) {
    http.cancel(currentKey);
    return http.get("/users/search",{ q: keyword }, currentKey);
  }
 */
export class HttpClient {
  private baseURL = "";
  private timeout = 30000;
  private handler?: FetchInterceptorsHandler;

  private requestInterceptors: Array<
    (config: RequestConfig) => Promise<RequestConfig> | RequestConfig
  > = [];

  private responseInterceptors: Array<
    (response: Response, config: RequestConfig) => Promise<any>
  > = [];

  private abortControllers = new Map<string, AbortController>();

  isRefreshing: boolean = false;

  private retryQueue: {
    resolve: (token: string) => void;
    reject: (err: any) => void;
  }[] = [];

  constructor(options?: {
    baseURL?: string;
    timeout?: number;
    handler?: FetchInterceptorsHandler;
  }) {
    this.baseURL = options?.baseURL ?? "";
    this.timeout = options?.timeout ?? 15000;
    this.handler = options?.handler;

    this.setupDefaultInterceptors();
  }

  private setupDefaultInterceptors() {
    this.useRequest(async (config) => {
      const headers = new Headers(config.headers);

      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");

      const token = this.handler?.getAccessToken?.();
      if (token) headers.set("Authorization", `Bearer ${token}`);

      const lang = this.handler?.getAcceptLanguage?.();
      if (lang) headers.set("Accept-Language", lang);

      return { ...config, headers };
    });

    this.useResponse(this.handleResponse.bind(this));
  }

  useRequest(
    interceptor: (
      config: RequestConfig
    ) => Promise<RequestConfig> | RequestConfig
  ) {
    this.requestInterceptors.push(interceptor);
  }

  useResponse(
    interceptor: (response: Response, config: RequestConfig) => Promise<any>
  ) {
    this.responseInterceptors.push(interceptor);
  }

  private handleBody(body?: BodyInit | Object | null): BodyInit | undefined {
    if (!body) return undefined;
    if (typeof body === "string") return body.trim();
    if (
      body instanceof FormData ||
      body instanceof Blob ||
      body instanceof ArrayBuffer ||
      body instanceof URLSearchParams ||
      body instanceof ReadableStream
    ) {
      return body;
    }
    return JSON.stringify(body);
  }

  private async request<T>(
    method: string,
    url: string,
    options?: RequestOptions
  ): Promise<T> {
    const { cancelKey, queryString, payload, ...fetchConfig } = options || {};

    let fullUrl = this.baseURL + url;

    if (queryString) {
      const qs = new URLSearchParams(queryString).toString();
      fullUrl += `?${qs}`;
    }

    const controller = new AbortController();
    if (cancelKey) {
      this.abortControllers.set(cancelKey, controller);
    }

    let config: RequestConfig = {
      ...fetchConfig,
      url: fullUrl,
      method,
      signal: controller.signal,
      body: this.handleBody(payload),
    };

    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config);
    }

    const timeoutId = setTimeout(() => {
      controller.abort();
      this.handler?.onError?.("time-out");
    }, this.timeout);

    try {
      const response = await fetch(config.url, config);
      clearTimeout(timeoutId);

      let result: any = response;
      for (const interceptor of this.responseInterceptors) {
        result = await interceptor(result, config);
      }

      return result;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error?.name === "AbortError") {
        // silently ignore OR custom callback
        return Promise.reject({ canceled: true });
      }

      this.handler?.onError?.("network-error", error);
      throw error;
    } finally {
      if (options?.cancelKey) {
        this.abortControllers.delete(options.cancelKey);
      }
    }
  }

  private async handleResponse(
    response: Response,
    config: RequestConfig
  ): Promise<any> {
    if (response.ok) {
      return response.json();
    }

    const status = response.status;

    if (status === 401) {
      return this.handleTokenExpired(config);
    }

    if (status === 400) this.handler?.onError?.("bad-request");
    if (status === 403) this.handler?.onError?.("forbidden");
    if (status === 404) this.handler?.onError?.("not-found");
    if (status === 500) this.handler?.onError?.("internal-server-error");

    throw response;
  }

  private createTempHttpClient(): HttpClient {
    const handler = this.handler!;
    const tempHttp = new HttpClient({
      baseURL: this.baseURL,
      timeout: this.timeout,
    });

    const tempHeaders = new Headers();
    const currentAccessToken = handler.getAccessToken?.();
    if (currentAccessToken)
      tempHeaders.set("Authorization", `Bearer ${currentAccessToken}`);
    const lang = handler.getAcceptLanguage?.();
    if (lang) tempHeaders.set("Accept-Language", lang);

    return tempHttp;
  }

  private async handleTokenExpired(config: RequestConfig): Promise<any> {
    const handler = this.handler!;
    const headers = new Headers(config.headers);

    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.retryQueue.push({ resolve, reject });
      }).then((token) => {
        headers.set("Authorization", `Bearer ${token}`);
        return fetch(config.url, { ...config, headers }).then((r) => r.json());
      });
    }

    this.isRefreshing = true;
    handler.setIsRefreshingInOtherTabs?.(true);

    const refreshToken = handler.getRefreshToken();
    if (!refreshToken) {
      handler.onForceLogout?.();
      throw new Error("No refresh token");
    }

    try {
      const tempHttp = this.createTempHttpClient();
      const newAuth = await handler.onRefreshToken({
        refreshToken,
        fetchInstance: tempHttp,
      });

      if (!newAuth?.accessToken) {
        throw new Error("Refresh token failed");
      }

      handler.onUpdateAuth(newAuth);

      this.retryQueue.forEach((p) => p.resolve(newAuth.accessToken));
      this.retryQueue = [];

      headers.set("Authorization", `Bearer ${newAuth.accessToken}`);

      const lang = handler.getAcceptLanguage?.(newAuth);
      if (lang) headers.set("Accept-Language", lang);

      return fetch(config.url, { ...config, headers }).then((r) => r.json());
    } catch (err) {
      this.retryQueue.forEach((p) => p.reject(err));
      this.retryQueue = [];
      handler.onRefreshTokenFail();
      throw err;
    } finally {
      this.isRefreshing = false;
      handler.setIsRefreshingInOtherTabs?.(false);
    }
  }

  get<T>(url: string, options?: RequestOptions) {
    return this.request<T>("GET", url, options);
  }

  post<T>(url: string, options?: RequestOptions) {
    return this.request<T>("POST", url, options);
  }

  put<T>(url: string, options?: RequestOptions) {
    return this.request<T>("PUT", url, options);
  }

  patch<T>(url: string, options?: RequestOptions) {
    return this.request<T>("PATCH", url, options);
  }

  delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>("DELETE", url, options);
  }

  cancel(key: string) {
    this.abortControllers.get(key)?.abort();
    this.abortControllers.delete(key);
  }

  setHandler(handler?: FetchInterceptorsHandler) {
    this.handler = handler;
  }

  getAbortController(key: string) {
    return this.abortControllers.get(key);
  }
}
