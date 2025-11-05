"use client";

import { ZodType } from "zod";
import { LocalStorageItemSchemaValidator, LocalStorageItemMigration } from "../local-storage-item";

export class LocalStorageItemZodValidator<T> implements LocalStorageItemSchemaValidator<T> {
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
  LocalStorageItemMigration<T>,
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
    schema: new LocalStorageItemZodValidator(schema),
  };
}
