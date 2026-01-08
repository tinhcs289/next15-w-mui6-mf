import { describe, expect, it } from "vitest";
import { z } from "zod";
import { LocalStorageItemZodValidator } from "./zod";

describe("LocalStorageItemZodValidator", () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
  });

  const validator = new LocalStorageItemZodValidator(schema);

  it("should return true for valid object in isValid()", () => {
    const valid = { name: "Jane", age: 25 };
    expect(validator.isValid(valid)).toBe(true);
  });

  it("should return false for invalid object in isValid()", () => {
    const invalid = { name: "Jane" }; // missing age
    expect(validator.isValid(invalid)).toBe(false);
  });

  it("should return parsed object in validate()", () => {
    const valid = { name: "Jane", age: 25 };
    expect(validator.validate(valid)).toEqual(valid);
  });

  it("should throw ZodError for invalid object in validate()", () => {
    const invalid = { name: "Jane" };
    expect(() => validator.validate(invalid)).toThrow();
  });
});
