import { describe, it, expect } from "vitest";
import isEqual from "./isEqual";

describe("isEqual", () => {
  // Primitives
  it("should return true for same primitives", () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual("hello", "hello")).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it("should return false for different primitives", () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual("a", "b")).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
  });

  // Objects
  it("should return true for shallow equal objects", () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it("should return false for shallow unequal objects", () => {
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it("should return false for deeply nested unequal objects", () => {
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  // Arrays
  it("should return true for equal arrays", () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it("should return false for unequal arrays", () => {
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false);
  });

  // Maps
  it("should return true for equal maps", () => {
    const a = new Map([["key", "value"]]);
    const b = new Map([["key", "value"]]);
    expect(isEqual(a, b)).toBe(true);
  });

  it("should return false for unequal maps", () => {
    const a = new Map([["key1", "value"]]);
    const b = new Map([["key2", "value"]]);
    expect(isEqual(a, b)).toBe(false);
  });

  // Sets (as iterables)
  it("should return true for equal sets (same order)", () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([1, 2, 3]);
    expect(isEqual(a, b)).toBe(true);
  });

  it("should return false for sets with different order (treated as ordered)", () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([3, 2, 1]);
    expect(isEqual(a, b)).toBe(false); // because your compareIterables is order-sensitive
  });

  // Edge: mixed types
  it("should return false for different types", () => {
    expect(isEqual([1, 2], { 0: 1, 1: 2 })).toBe(false);
    expect(isEqual(new Set([1, 2]), [1, 2] as unknown as Set<number>)).toBe(false);
  });

  // Edge: one is null
  it("should return false if one value is null", () => {
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual({}, null)).toBe(false);
  });

  // Edge: same reference
  it("should return true for same reference", () => {
    const obj = { a: 1 };
    expect(isEqual(obj, obj)).toBe(true);
  });

  // Nested object reference equality
  it("should return true for nested object reference equality", () => {
    const nested = { a: 1 };
    expect(isEqual({ nested }, { nested })).toBe(true);
  });

  // Complex edge: Object.entries fallback
  it("should use Object.entries fallback when no iterator", () => {
    const a = Object.create(null);
    a.x = 1;

    const b = Object.create(null);
    b.x = 1;

    expect(isEqual(a, b)).toBe(true);
  });
});
