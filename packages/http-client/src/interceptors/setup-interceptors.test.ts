import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { beforeEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  AxiosInterceptorsHandler,
  setupInterceptors,
} from "./setup-interceptors";

let http: AxiosInstance;
let mock: MockAdapter;

const createHandler = (overrides = {}): AxiosInterceptorsHandler<any> => {
  return {
    getAccessToken: () => "access_token_mock",
    getRefreshToken: () => "refresh_token_mock",
    onRefreshToken: vi.fn().mockResolvedValue({
      accessToken: "new_access_token",
      refreshToken: "new_refresh_token",
    }),
    onRefreshTokenFail: vi.fn(),
    onUpdateAuth: vi.fn(),
    onForceLogout: vi.fn(),
    onError: vi.fn(),
    ...overrides,
  };
};

describe("setupInterceptors", () => {
  beforeAll(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  beforeEach(() => {
    http = axios.create();
    mock = new MockAdapter(http);
  });

  it("should attach access token and content headers", async () => {
    const handler = createHandler();
    setupInterceptors(http, handler);

    mock.onGet("/test").reply((config) => {
      expect(config?.headers?.Authorization).toBe("Bearer access_token_mock");
      expect(config?.headers?.["Content-Type"]).toBe("application/json");
      return [200, { success: true }];
    });

    const res = await http.get("/test");
    expect(res.status).toBe(200);
  });

  it("should refresh token on 401 and retry the request", async () => {
    const handler = createHandler();

    let callCount = 0;
    mock.onGet("/test").reply(() => {
      callCount++;
      if (callCount === 1) return [401];
      return [200, { success: true }];
    });

    setupInterceptors(http, handler);

    const res = await http.get("/test");

    expect(res.status).toBe(200);
    expect(handler.onRefreshToken).toHaveBeenCalled();
    expect(handler.onUpdateAuth).toHaveBeenCalledWith({
      accessToken: "new_access_token",
      refreshToken: "new_refresh_token",
    });
  });

  it("should call onRefreshTokenFail and reject if refresh fails", async () => {
    const handler = createHandler({
      onRefreshToken: vi.fn().mockRejectedValue(new Error("refresh failed")),
    });

    mock.onGet("/test").reply(401);

    setupInterceptors(http, handler);

    await expect(http.get("/test")).rejects.toThrow("refresh failed");
    expect(handler.onRefreshTokenFail).toHaveBeenCalled();
  });

  it("should call onForceLogout if no refresh token", async () => {
    const handler = createHandler({
      getRefreshToken: () => null,
    });

    mock.onGet("/test").reply(401);

    setupInterceptors(http, handler);

    await expect(http.get("/test")).rejects.toBeTruthy();
    expect(handler.onForceLogout).toHaveBeenCalled();
  });

  it("should handle different error status codes", async () => {
    const handler = createHandler();

    setupInterceptors(http, handler);

    const errors = [
      { code: 400, type: "bad-request" },
      { code: 404, type: "not-found" },
      { code: 500, type: "internal-server-error" },
      { code: 403, type: "forbidden" },
    ];

    for (const { code, type } of errors) {
      mock.onGet(`/error-${code}`).reply(code);
      await http.get(`/error-${code}`);
      expect(handler.onError).toHaveBeenCalledWith(type, expect.any(Object));
    }
  });

  it("should handle timeout error", async () => {
    const handler = createHandler();
    setupInterceptors(http, handler);

    mock.onGet("/timeout").timeout();

    await http.get("/timeout");
    expect(handler.onError).toHaveBeenCalledWith(
      "time-out",
      expect.any(Object)
    );
  });

  it("should handle network error", async () => {
    const handler = createHandler();
    setupInterceptors(http, handler);

    mock.onGet("/network-error").networkError();

    await http.get("/network-error");
    expect(handler.onError).toHaveBeenCalledWith(
      "network-error",
      expect.any(Object)
    );
  });

  it("should queue requests during token refresh", async () => {
    const refreshPromise = vi.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                accessToken: "new_access_token",
                refreshToken: "new_refresh_token",
              }),
            0
          )
        )
    );

    const handler = createHandler({
      onRefreshToken: refreshPromise,
    });

    let callCount = 0;
    mock.onGet("/queue-test").reply(() => {
      callCount++;
      return callCount === 1 ? [401] : [200, { ok: true }];
    });

    setupInterceptors(http, handler);

    const [res1, res2] = await Promise.all([
      http.get("/queue-test"),
      http.get("/queue-test"),
    ]);

    expect(res1.status).toBe(200);
    expect(res2.status).toBe(200);
    expect(handler.onRefreshToken).toHaveBeenCalledTimes(1);
  });
});
