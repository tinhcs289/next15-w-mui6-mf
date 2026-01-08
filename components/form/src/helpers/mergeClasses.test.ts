import { describe, it, expect } from "vitest";
import mergeClasses from "./mergeClasses";

describe("mergeClasses", () => {
  it("should join multiple classes correctly", () => {
    const result = mergeClasses("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should filter out undefined or null values", () => {
    const result = mergeClasses(
      "class1",
      undefined,
      "class2",
      null as unknown as string,
      "class3"
    );
    expect(result).toBe("class1 class2 class3");
  });

  it("should return an empty string if all values are undefined or null", () => {
    const result = mergeClasses(
      undefined,
      null as unknown as string,
      undefined
    );
    expect(result).toBe("");
  });

  it("should handle an empty input", () => {
    const result = mergeClasses();
    expect(result).toBe("");
  });
});
