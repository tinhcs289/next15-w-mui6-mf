import type { ArraySchema, ObjectSchema, AnyObject as YupObject } from "yup";

export type AnyObject = {
  [x: string]: any;
};

export type YupObjectSchema<T extends AnyObject = AnyObject> = ObjectSchema<
  T,
  YupObject,
  any,
  ""
>;

export type YupArrayOfObjectsSchema<T extends AnyObject = AnyObject> =
  ArraySchema<T[] | undefined, YupObject, "", "">;
