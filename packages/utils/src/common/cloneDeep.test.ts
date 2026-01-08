import { describe, expect, it } from "vitest";
import cloneDeep from "./cloneDeep";

class Person {
  constructor(
    public name: string,
    private age: number
  ) {}
  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

describe("cloneDeep", () => {
  it("should clone primitive values", () => {
    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep("hello")).toBe("hello");
    expect(cloneDeep(null)).toBeNull();
    expect(cloneDeep(undefined)).toBeUndefined();
    expect(cloneDeep(true)).toBe(true);
  });

  it("should clone arrays deeply", () => {
    const arr = [1, [2, 3], { x: 4 }];
    const cloned = cloneDeep(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
    expect(cloned[2]).not.toBe(arr[2]);
  });

  it("should clone objects deeply", () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });

  it("should preserve class instance and prototype methods", () => {
    const alice = new Person("Alice", 30);
    const cloned = cloneDeep(alice);
    expect(cloned).not.toBe(alice);
    expect(cloned instanceof Person).toBe(true);
    expect(cloned.greet()).toBe("Hi, I'm Alice");
  });

  it("should clone Map and Set", () => {
    // @ts-ignore
    const map = new Map([
      ["a", 1],
      ["b", { x: 2 }],
    ]);
    const set = new Set([1, 2, { y: 3 }]);
    const clonedMap = cloneDeep(map);
    const clonedSet = cloneDeep(set);

    expect(clonedMap).not.toBe(map);
    expect(clonedMap.get("b")).not.toBe(map.get("b"));
    expect(clonedMap.get("b")).toEqual({ x: 2 });

    expect(clonedSet).not.toBe(set);
    expect([...clonedSet][2]).toEqual({ y: 3 });
  });

  it("should handle circular references", () => {
    const obj: any = { name: "circle" };
    obj.self = obj;
    const cloned = cloneDeep(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.self).toBe(cloned);
  });

  it("should clone Date and RegExp", () => {
    const date = new Date();
    const regex = /abc/g;
    const clonedDate = cloneDeep(date);
    const clonedRegex = cloneDeep(regex);

    expect(clonedDate).not.toBe(date);
    expect(clonedDate.getTime()).toBe(date.getTime());

    expect(clonedRegex).not.toBe(regex);
    expect(clonedRegex.source).toBe(regex.source);
    expect(clonedRegex.flags).toBe(regex.flags);
  });

  it("should clone Error objects", () => {
    const err = new Error("oops");
    (err as any).extra = { code: 123 };
    const cloned = cloneDeep(err);
    expect(cloned).not.toBe(err);
    expect(cloned.message).toBe("oops");
    // @ts-ignore
    expect(cloned.extra).toEqual({ code: 123 });
  });

  it("should clone TypedArray and ArrayBuffer", () => {
    const arr = new Uint8Array([1, 2, 3]);
    const clonedArr = cloneDeep(arr);
    expect(clonedArr).not.toBe(arr);
    expect([...clonedArr]).toEqual([1, 2, 3]);

    const buffer = new ArrayBuffer(8);
    const clonedBuffer = cloneDeep(buffer);
    expect(clonedBuffer).not.toBe(buffer);
    expect(clonedBuffer.byteLength).toBe(buffer.byteLength);
  });
});
