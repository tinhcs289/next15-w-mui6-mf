"use client";

import { Schema } from "yup";
import { CookieItemSchemaValidator, CookieItemMigration } from "../cookie-item";

export class CookieItemYupValidator<T> implements CookieItemSchemaValidator<T> {
  constructor(private schema: Schema<T>) {}

  isValid(value: unknown): boolean {
    return this.schema.isValidSync(value);
  }

  validate(value: unknown): T {
    return this.schema.validateSync(value);
  }
}

export type YupMigrationParams<T> = Omit<CookieItemMigration<T>, "schema"> & {
  schema: Schema<T>;
};

export function yupMigration<T>({
  schema,
  version,
  migrate,
}: YupMigrationParams<T>) {
  return {
    version,
    migrate,
    schema: new CookieItemYupValidator(schema),
  };
}
