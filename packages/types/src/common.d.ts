import type { ArraySchema, ObjectSchema, AnyObject as YupObject } from "yup";

export type AnyObject = {
  [x: string]: any;
};

export type YupObjectSchema<T extends AnyObject = AnyObject> = ObjectSchema<
  T,
  YupObject,
  {
    [K in keyof T]: undefined;
  },
  ""
>;
