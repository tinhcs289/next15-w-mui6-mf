import type { AuthData } from "@shared/auth";
import type { AxiosError, AxiosInstance } from "axios";

type GetCallbacks = {
  accessToken: () => string | undefined | null;
  refreshToken: () => string | undefined | null;
  acceptlanguage: (data?: AuthData) => string | undefined | null;
};

type SetCallbacks = {
  isRefresingInOtherTabs: (isRefreshing: boolean) => void;
};

type OnCallbacks = {
  refreshToken: (payload: {
    refreshToken: string;
    axiosInstance: AxiosInstance;
  }) => Promise<AuthData | null | undefined>;
  refreshTokenFail: () => void;
  forceLogout: () => void;
  updateAuth: (newAuth: AuthData) => void;
  error: (
    type:
      | "network-error"
      | "time-out"
      | "internal-server-error"
      | "bad-request"
      | "not-found"
      | "other",
    error?: AxiosError<any, any>
  ) => void;
};

export type AxiosInterceptorsHandler = {
  isRefreshing?: boolean;
  get: GetCallbacks;
  set: SetCallbacks;
  on: OnCallbacks;
};