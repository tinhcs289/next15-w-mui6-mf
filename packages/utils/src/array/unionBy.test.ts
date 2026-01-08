import { describe, it, expect } from "vitest";
import unionBy from "./unionBy";

type User = { id: number; name: string };

describe("unionBy", () => {
  it("should combine arrays and remove duplicates using a key", () => {
    const arr1: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const arr2: User[] = [
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    const result = unionBy(arr1, arr2, "id");
    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("should combine arrays and remove duplicates using a callback", () => {
    const arr1: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const arr2: User[] = [
      { id: 4, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    const result = unionBy(arr1, arr2, (u) => u.name);
    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("should return an empty array if all inputs are empty", () => {
    const result = unionBy([], [], "id");
    expect(result).toEqual([]);
  });

  it("should handle a single array", () => {
    const arr: User[] = [
      { id: 1, name: "Alice" },
      { id: 1, name: "Alice" },
    ];
    const result = unionBy(arr, "id");
    expect(result).toEqual([{ id: 1, name: "Alice" }]);
  });

  it("should handle multiple arrays and complex keys", () => {
    const arr1 = [{ x: 1, y: 2 }, { x: 2, y: 3 }];
    const arr2 = [{ x: 1, y: 5 }, { x: 3, y: 4 }];
    const result = unionBy(arr1, arr2, "x");
    expect(result).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ]);
  });
});
