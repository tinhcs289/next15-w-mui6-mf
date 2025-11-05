import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { AuthData } from "./auth-data";
import { authCookie, authDataUtils, authLocalStorage } from "./auth-data";
import { AuthStatesProvider, useGetAuthState } from "./context";

vi.mock("./auth-data", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./auth-data")>();
  return {
    ...actual,
    authCookie: { set: vi.fn(), get: vi.fn() },
    authLocalStorage: { set: vi.fn(), get: vi.fn() },
  };
});

const fakeAuth: AuthData = {
  provider: "credentials",
  accessToken: "token",
  refreshToken: "refresh",
  issuedAt: { timestamp: 1, date: null },
  expiredAt: { timestamp: 2, date: null, interval: 1000 },
};

describe("AuthStatesContext", () => {
  it("updates cookie, localStorage and internal auth state when saving auth", () => {
    let saveAuth: ((data?: AuthData | null) => void) | undefined;
    let authValue: AuthData | null = null;

    const CaptureComponent = () => {
      const save = useGetAuthState((s) => s?.saveAuthToStore);
      const auth = useGetAuthState((s) => s?.auth);
      saveAuth = save;
      authValue = auth as AuthData;
      return null;
    };

    render(
      <AuthStatesProvider>
        <CaptureComponent />
      </AuthStatesProvider>
    );

    const plain = authDataUtils.convertToPlain(fakeAuth);

    act(() => {
      saveAuth?.(fakeAuth);
    });

    expect(authCookie.set).toHaveBeenCalledWith(plain);
    expect(authLocalStorage.set).toHaveBeenCalledWith(plain, {
      skipTriggerChangeInThisTab: true,
    });

    expect(authValue).toStrictEqual(fakeAuth);
  });

  it("clears cookie, localStorage and resets auth state when saving null", () => {
    let saveAuth: ((data?: AuthData | null) => void) | undefined;
    let authValue: AuthData | null = fakeAuth;

    const CaptureComponent = () => {
      const save = useGetAuthState((s) => s.saveAuthToStore);
      const auth = useGetAuthState((s) => s.auth);
      saveAuth = save;
      authValue = auth as AuthData;
      return null;
    };

    render(
      <AuthStatesProvider>
        <CaptureComponent />
      </AuthStatesProvider>
    );

    act(() => {
      saveAuth?.(null);
    });

    expect(authCookie.set).toHaveBeenCalledWith(null);
    expect(authLocalStorage.set).toHaveBeenCalledWith(null, {
      skipTriggerChangeInThisTab: true,
    });

    expect(authValue).toBeNull();
  });
});
