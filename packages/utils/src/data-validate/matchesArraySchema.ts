import type { ArraySchema, AnyObject } from "yup";

export default function matchesArraySchema<T>(
  valueToCheck: T[] | null,
  schema: ArraySchema<T[] | undefined, AnyObject, "", "">
) {
  if (!valueToCheck) return false;
  if (!schema) return false;
  try {
    schema.validateSync(valueToCheck);
    return true;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
}