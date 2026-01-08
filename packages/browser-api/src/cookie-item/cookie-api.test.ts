import { describe, it, expect, beforeEach } from "vitest";
import { cookiesApi } from "./cookie-api";

function getRawCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function clearAllCookies() {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
  });
}

describe("cookiesApi", () => {
  beforeEach(() => {
    clearAllCookies();
  });

  it("sets a cookie without expiration", () => {
    cookiesApi.set("testKey", "testValue");
    expect(getRawCookie("testKey")).toBe("testValue");
  });

  it("sets a cookie with expiration (days)", () => {
    cookiesApi.set("expiringKey", "expVal", { days: 1 });

    const cookieStr = document.cookie;
    expect(cookieStr.includes("expiringKey=")).toBe(true);
  });

  it("gets a cookie correctly", () => {
    document.cookie = "getKey=hello";
    expect(cookiesApi.get("getKey")).toBe("hello");
  });

  it("returns null if cookie not found", () => {
    expect(cookiesApi.get("nonExistentKey")).toBeNull();
  });

  it("encodes special characters in value", () => {
    cookiesApi.set("specialKey", "value with space & %");
    expect(getRawCookie("specialKey")).toBe("value with space & %");
    expect(cookiesApi.get("specialKey")).toBe("value with space & %");
  });

  it("removes a cookie", () => {
    cookiesApi.set("removeMe", "bye");
    cookiesApi.remove("removeMe");
    expect(cookiesApi.get("removeMe")).toBeNull();
  });
});
