import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { FetchInterceptorsHandler, HttpClient } from "./http-client";
import { createRESTServer } from "./http-client.integration.server";

describe("HttpClient", () => {
  const port = 4001;
  let http: HttpClient;
  let handler: FetchInterceptorsHandler;
  let server: any;
  let baseURL = `http://localhost:${port}`;
  let closeServer: () => void;
  let currentAccessToken = "access_token_mock";
  let refreshCount = 0;

  beforeAll(() => {
    const restServer = createRESTServer(port);
    server = restServer.server;
    closeServer = restServer.closeServer;
  });

  afterAll(() => {
    closeServer();
  });

  beforeEach(() => {
    refreshCount = 0;
    currentAccessToken = "access_token_mock";

    handler = {
      getAccessToken: () => currentAccessToken,
      getRefreshToken: () => "refresh_token_mock",
      onRefreshToken: vi.fn(async ({ fetchInstance }) => {
        return fetchInstance.post("/auth/refresh", {
          refreshToken: "refresh_token_mock",
        });
      }),
      onUpdateAuth: vi.fn((newAuth) => {
        currentAccessToken = newAuth.accessToken;
      }),
      onRefreshTokenFail: vi.fn(),
      onForceLogout: vi.fn(),
      onError: vi.fn(),
    };

    http = new HttpClient({ baseURL, handler, timeout: 500 });
  });

  it("should send correct headers and query params in GET", async () => {
    const res = await http.get<{ success: boolean }>("/test-get", {
      queryString: {
        foo: "bar",
      },
    });
    expect(res.success).toBe(true);
  });

  it("should handle POST, PUT, PATCH, DELETE with body", async () => {
    const postRes = await http.post<{ received: { name: string } }>(
      "/test-post",
      { payload: { name: "John" } }
    );
    expect(postRes.received).toEqual({ name: "John" });

    const putRes = await http.put<{ updated: { id: number; name: string } }>(
      "/test-put",
      { payload: { id: 1, name: "Jane" } }
    );
    expect(putRes.updated).toEqual({ id: 1, name: "Jane" });

    const patchRes = await http.patch<{ patched: { name: string } }>(
      "/test-patch",
      { payload: { name: "Patch" } }
    );
    expect(patchRes.patched).toEqual({ name: "Patch" });

    const deleteRes = await http.delete<{ deleted: boolean }>("/test-delete");
    expect(deleteRes.deleted).toBe(true);
  });

  it("should refresh token on 401 and retry request", async () => {
    currentAccessToken = "expired_token";
    const res = await http.get<{ success: boolean }>("/test-get");
    expect(res.success).toBe(true);
    expect(handler.onRefreshToken).toHaveBeenCalled();
    expect(handler.onUpdateAuth).toHaveBeenCalled();
  });

  // FIXME
  it("should queue multiple requests during refresh", async () => {
    currentAccessToken = "expired_token";

    const [res1, res2] = await Promise.all([
      http.get<{ success: boolean }>("/test-get"),
      http.get<{ success: boolean }>("/test-get"),
    ]);

    expect(res1.success).toBe(true);
    expect(res2.success).toBe(true);
    expect(handler.onRefreshToken).toHaveBeenCalledTimes(1);
  });

  it("should force logout if no refresh token", async () => {
    handler.getRefreshToken = () => null;
    currentAccessToken = "expired";

    await expect(http.get("/test-get")).rejects.toThrow();
    expect(handler.onForceLogout).toHaveBeenCalled();
  });

  it("should handle different error codes", async () => {
    await http.get("/error-400").catch(() => {});
    expect(handler.onError).toHaveBeenCalledWith("bad-request");

    await http.get("/error-403").catch(() => {});
    expect(handler.onError).toHaveBeenCalledWith("forbidden");

    await http.get("/error-404").catch(() => {});
    expect(handler.onError).toHaveBeenCalledWith("not-found");

    await http.get("/error-500").catch(() => {});
    expect(handler.onError).toHaveBeenCalledWith("internal-server-error");
  });

  it("should handle timeout and cancelable requests", async () => {
    const cancelKey = "timeout-test";
    const p = http.get("/timeout", { cancelKey });
    http.cancel(cancelKey);
    await expect(p).rejects.toMatchObject({ canceled: true });
    expect(handler.onError).not.toHaveBeenCalledWith("time-out");
  });
});
