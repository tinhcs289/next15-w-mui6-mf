import type { AnyObject, ObjectSchema } from "yup";

export default function matchesSchema<T extends AnyObject = AnyObject>(
  valueToCheck: T | null | undefined,
  schema: ObjectSchema<T, AnyObject, any, "">
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