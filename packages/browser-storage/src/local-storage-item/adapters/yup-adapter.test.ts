import { describe, expect, it } from "vitest";
import * as yup from "yup";
import { LocalStorageItemYupValidator } from "./yup";

describe("LocalStorageItemYupValidator", () => {
  const schema = yup.object({
    name: yup.string().required(),
    age: yup.number().required(),
  });

  const validator = new LocalStorageItemYupValidator(schema);

  it("should return true for valid object in isValid()", () => {
    const valid = { name: "John", age: 30 };
    expect(validator.isValid(valid)).toBe(true);
  });

  it("should return false for invalid object in isValid()", () => {
    const invalid = { name: "John" }; // missing age
    expect(validator.isValid(invalid)).toBe(false);
  });

  it("should return parsed object in validate()", () => {
    const data = { name: "John", age: 30 };
    expect(validator.validate(data)).toEqual(data);
  });

  it("should throw error in validate() for invalid object", () => {
    const invalid = { name: "John" };
    expect(() => validator.validate(invalid)).toThrow();
  });
});
