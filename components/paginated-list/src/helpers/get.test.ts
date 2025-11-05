import { describe, expect, it } from "vitest";
import get from "./get";

describe("get", () => {
  const obj = {
    a: {
      b: {
        c: 3,
        d: null,
      },
      e: [10, 20, { f: 30 }],
    },
    x: 0,
  };

  it("should get shallow property", () => {
    expect(get(obj, "x")).toBe(0);
  });

  it("should get deep nested property by dot path", () => {
    expect(get(obj, "a.b.c")).toBe(3);
  });

  it("should get deep nested property by array path", () => {
    expect(get(obj, ["a", "b", "c"])).toBe(3);
  });

  it("should get array index value", () => {
    expect(get(obj, "a.e[1]")).toBe(20);
  });

  it("should get nested value inside array of objects", () => {
    expect(get(obj, "a.e[2].f")).toBe(30);
  });

  it("should return default value for missing path", () => {
    expect(get(obj, "a.missing.path", "default")).toBe("default");
  });

  it("should return default value when path leads to undefined", () => {
    expect(get(obj, "a.b.missing", "not found")).toBe("not found");
  });

  it("should return null value correctly (not replaced by default)", () => {
    expect(get(obj, "a.b.d", "default")).toBe(null);
  });

  it("should handle array path with numbers correctly", () => {
    expect(get(obj, ["a", "e", 2, "f"])).toBe(30);
  });

  it("should handle empty path gracefully", () => {
    expect(get(obj, "", "fallback")).toBe("fallback");
  });

  it("should handle non-object input safely", () => {
    expect(get(null, "a.b", "default")).toBe("default");
    expect(get(undefined, "a.b", "default")).toBe("default");
  });

  it("should handle root object as default path", () => {
    expect(get(obj, [], "fallback")).toBe(obj);
  });

  it("should handle numeric keys in objects", () => {
    const data = { 1: { 2: "value" } };
    expect(get(data, [1, 2])).toBe("value");
  });
});
