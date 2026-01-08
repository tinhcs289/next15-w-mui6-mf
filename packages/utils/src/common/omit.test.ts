import { describe, expect, it } from "vitest";
import omit from "./omit";

describe("omit utility function", () => {
  it("should remove a single key from object", () => {
    const input = { a: 1, b: 2, c: 3 };
    const result = omit(input, "b");
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should remove multiple keys from object", () => {
    const input = { a: 1, b: 2, c: 3, d: 4 };
    const result = omit(input, ["b", "d"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should not modify the original object", () => {
    const input = { x: 10, y: 20 };
    const copy = { ...input };
    omit(input, "x");
    expect(input).toEqual(copy);
  });

  it("should return same object when no keys are omitted", () => {
    const input = { a: 1, b: 2 };
    const result = omit(input, []);
    expect(result).toEqual(input);
  });

  it("should handle non-existent keys gracefully", () => {
    const input = { name: "Alice", age: 30 };
    const result = omit(input, ["nonexistent" as any]);
    expect(result).toEqual(input);
  });

  it("should work correctly with nested objects", () => {
    const input = {
      id: 1,
      user: { name: "Alice", email: "alice@example.com" },
      active: true,
    };
    const result = omit(input, "active");
    expect(result).toEqual({
      id: 1,
      user: { name: "Alice", email: "alice@example.com" },
    });
  });

  it("should omit keys with undefined or null values as well", () => {
    const input = { a: 1, b: undefined, c: null, d: 4 };
    const result = omit(input, ["b", "c"]);
    expect(result).toEqual({ a: 1, d: 4 });
  });

  it("should handle keys that are symbols", () => {
    const symKey = Symbol("sym");
    const input = { a: 1, [symKey]: 2 };
    const result = omit(input, [symKey]);
    expect(result).toEqual({ a: 1 });
  });

  it("should preserve array, date, and object types", () => {
    const input = {
      id: 1,
      tags: ["a", "b"],
      createdAt: new Date("2020-01-01"),
      meta: { version: 2 },
    };
    const result = omit(input, "meta");

    expect(result).toEqual({
      id: 1,
      tags: ["a", "b"],
      createdAt: new Date("2020-01-01"),
    });
    expect(Array.isArray(result.tags)).toBe(true);
    expect(result.createdAt instanceof Date).toBe(true);
  });

  it("should handle empty object input", () => {
    const result = omit({}, "a" as unknown as never[]);
    expect(result).toEqual({});
  });
});
