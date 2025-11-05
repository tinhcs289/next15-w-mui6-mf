"use client";

import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Axios from "axios";

type AuthData = {
  accessToken: string;
  refreshToken: string;
  [x: string]: any;
};

export interface AxiosInterceptorsHandler<T extends AuthData = AuthData> {
  //#region props
  isRefreshing?: boolean;
  //#endregion
  //#region setters
  setIsRefresingInOtherTabs?: (isRefreshing: boolean) => void;
  //#endregion
  //#region getters
  getAccessToken: () => string | undefined | null;
  getRefreshToken: () => string | undefined | null;
  getAcceptlanguage?: (data?: T) => string | undefined | null;
  //#endregion
  //#region callbacks
  onRefreshToken: (payload: {
    refreshToken: string;
    axiosInstance: AxiosInstance;
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
    error?: AxiosError<any, any>
  ) => void;
  //#endregion
}

let retryQueue: { resolve: any; reject: any }[] = [];

function retryOrClearRequests(error: any, token: string | null) {
  retryQueue.forEach((prom) =>
    error ? prom.reject(error as any) : prom.resolve(token as any)
  );
  retryQueue = [];
}

export function setupInterceptors(
  http: AxiosInstance,
  handler: AxiosInterceptorsHandler
) {
  if (!http || !handler) return;
  console.log("Interceptors were added to axios instance");

  http.interceptors.request.use(
    function onFulfilled(config) {
      if (config?.headers) {
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json";

        if (typeof handler.getAcceptlanguage === "function") {
          const language = handler.getAcceptlanguage();
          if (language) config.headers["Accept-Language"] = language;
        }

        if (typeof handler.getAccessToken === "function") {
          const token = handler.getAccessToken();
          if (token) config.headers["Authorization"] = `Bearer ${token}`;
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
      const isTimeOut = error?.code === "ECONNABORTED";
      if (isTimeOut) {
        handler.onError?.("time-out", error);
        return Promise.resolve(error as any);
      }

      if (!error || !error?.config || !error?.response) {
        handler.onError?.("network-error", error);
        return Promise.resolve(error as any);
      }

      const isInternalServerError = error?.response?.status === 500;
      if (isInternalServerError) {
        handler.onError?.("internal-server-error", error);
        return Promise.resolve(error.response);
      }

      const isBadRequest = error?.response?.status === 400;
      if (isBadRequest) {
        handler.onError?.("bad-request", error);
        return Promise.resolve(error.response);
      }

      const isForbidden = error?.response?.status === 403;
      if (isForbidden) {
        handler.onError?.("forbidden", error);
        return Promise.resolve(error.response);
      }

      const isNotFound = error?.response?.status === 404;
      if (isNotFound) {
        handler.onError?.("not-found", error);
        return Promise.resolve(error.response);
      }

      const isTokenExpired = error?.response?.status === 401;

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
        } else {
          handler.isRefreshing = true;
          handler.setIsRefresingInOtherTabs?.(true);
        }

        const refreshToken = handler.getRefreshToken();
        if (!refreshToken) {
          handler.onForceLogout?.();
          return Promise.reject(error);
        }

        console.log("refreshing......");

        const tempHttp = Axios.create();

        return new Promise((resolve, reject) => {
          handler
            .onRefreshToken({ refreshToken, axiosInstance: tempHttp })
            .then((newAuth) => {
              if (!newAuth?.accessToken || !newAuth?.refreshToken) {
                handler.onRefreshTokenFail();
              } else {
                const currentAccessToken = handler.getAccessToken();
                if (newAuth.accessToken !== currentAccessToken) {
                  handler.onUpdateAuth(newAuth);

                  if (error?.config?.headers) {
                    error.config.headers.Authorization = `Bearer ${newAuth.accessToken}`;

                    if (typeof handler.getAcceptlanguage === "function") {
                      const newLang = handler.getAcceptlanguage(newAuth);
                      if (newLang)
                        error.config.headers["Accept-Language"] = newLang;
                    }
                  }

                  retryOrClearRequests(null, newAuth.accessToken);
                  resolve(http(error.config as any));
                  console.log("updated token");
                } else {
                  handler.onRefreshTokenFail();
                  reject(error);
                }
              }
            })
            .catch((err) => {
              retryOrClearRequests(err, null);
              handler.onRefreshTokenFail();
              reject(err);
            })
            .finally(() => {
              handler.isRefreshing = false;
              handler.setIsRefresingInOtherTabs?.(false);
            });
        });
      }

      const isUnknownError = error?.code === "ERR_BAD_REQUEST";
      if (isUnknownError) {
        handler.onError?.("other", error);
        return Promise.resolve(error as any);
      }

      return Promise.reject(error);
    }
  );
}
