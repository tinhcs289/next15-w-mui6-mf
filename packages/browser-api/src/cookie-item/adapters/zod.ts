"use client";

import { ZodType } from "zod";
import { CookieItemSchemaValidator, CookieItemMigration } from "../cookie-item";

export class CookieItemZodValidator<T> implements CookieItemSchemaValidator<T> {
  constructor(private schema: ZodType<T>) {}

  isValid(value: unknown): boolean {
    return this.schema.safeParse(value).success;
  }

  validate(value: unknown): T {
    const result = this.schema.safeParse(value);
    if (!result.success) throw result.error;
    return result.data;
  }
}

export type ZodMigrationParams<T> = Omit<
  CookieItemMigration<T>,
  "schema"
> & {
  schema: ZodType<T>;
};

export function zodMigration<T>({
  schema,
  version,
  migrate,
}: ZodMigrationParams<T>) {
  return {
    version,
    migrate,
    schema: new CookieItemZodValidator(schema),
  };
}
