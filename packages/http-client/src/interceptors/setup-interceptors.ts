import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Axios from "axios";
import type { AxiosInterceptorsHandler } from "./types";

let retryQueue: { resolve: any; reject: any }[] = [];

function retryOrClearRequests(error: any, token: string | null) {
  retryQueue.forEach((prom) =>
    error ? prom.reject(error as any) : prom.resolve(token as any)
  );
  retryQueue = [];
};

export function setupInterceptors(
  http: AxiosInstance,
  handler: AxiosInterceptorsHandler
) {
  if (!http) return;
  console.log("Interceptors were added to axios instance");

  http.interceptors.request.use(
    function onFulfilled(config) {
      if (config?.headers) {
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json";

        if (typeof handler.get.acceptlanguage === "function") {
          const lang = handler.get.acceptlanguage();
          if (lang) config.headers["Accept-Language"] = lang;
        }

        if (typeof handler.get.accessToken === "function") {
          const token = handler.get.accessToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    async function onRejected(error) {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    function onFulfilled(response) {
      return response;
    },
    async function onRejected(
      error: AxiosError<any>
    ): Promise<void | AxiosResponse<any>> {
      if (!error || !error?.config || !error?.response) {
        handler.on.error("network-error", error);
        return Promise.resolve(error as any);
      }

      const isTimeOut = error?.code === "ECONNABORTED";
      if (isTimeOut) {
        handler.on.error("time-out", error);
        return Promise.resolve(error as any);
      }

      const isInternalServerError = error?.response?.status === 500;
      if (isInternalServerError) {
        handler.on.error("internal-server-error", error);
        return Promise.resolve(error.response);
      }

      const isBadRequest = error?.response?.status === 400;
      if (isBadRequest) {
        handler.on.error("bad-request", error);
        return Promise.resolve(error.response);
      }

      const isNotFound = error?.response?.status === 404;
      if (isNotFound) {
        handler.on.error("not-found", error);
        return Promise.resolve(error.response);
      }

      const isTokenExpired =
        error?.response?.status === 401 && !handler.isRefreshing;

      if (isTokenExpired) {
        console.log("token expired");
        if (handler?.isRefreshing) {
          return new Promise((resolve, reject) =>
            retryQueue.push({ resolve, reject })
          )
            .then((accessToken) => {
              if (error?.config?.headers) {
                error.config.headers.Authorization = `Bearer ${accessToken}`;
              }
              return http(error.config as any);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        handler.isRefreshing = true;
        handler.set.isRefresingInOtherTabs(true);
        const refreshToken = handler.get.refreshToken();
        if (!refreshToken) {
          handler.on.forceLogout();
          return Promise.reject(error);
        }

        console.log("refreshing......");

        const tempHttp = Axios.create();

        return new Promise((resolve) => {
          handler.on
            .refreshToken({ refreshToken, axiosInstance: tempHttp })
            .then((newAuth) => {
              if (!newAuth?.accessToken || !newAuth?.refreshToken) {
                handler.on.refreshTokenFail();
              } else {
                handler.on.updateAuth(newAuth);
                if (error?.config?.headers) {
                  error.config.headers.Authorization = `Bearer ${newAuth.accessToken}`;

                  if (typeof handler.get.acceptlanguage === "function") {
                    const newLang = handler.get.acceptlanguage(newAuth);
                    if (newLang) error.config.headers['Accept-Language'] = newLang;;
                  }
                }
                retryOrClearRequests(null, newAuth.accessToken);
                resolve(http(error.config as any));
                console.log("updated token");
              }
            })
            .catch((err) => {
              retryOrClearRequests(err, null);
              handler.on.refreshTokenFail();
            })
            .finally(() => {
              handler.isRefreshing = false;
              handler.set.isRefresingInOtherTabs(false);
            });
        });
      }


      const isUnknownError = error?.code === "ERR_BAD_REQUEST";
      if (isUnknownError) {
        handler.on.error("other", error);
        return Promise.resolve(error as any);
      }

      return Promise.reject(error);
    }
  );
}