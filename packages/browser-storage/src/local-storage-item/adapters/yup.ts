"use client";

import { Schema } from "yup";
import {
  LocalStorageItemSchemaValidator,
  LocalStorageItemMigration,
} from "../local-storage-item";

export class LocalStorageItemYupValidator<T>
  implements LocalStorageItemSchemaValidator<T>
{
  constructor(private schema: Schema<T>) {}

  isValid(value: unknown): boolean {
    return this.schema.isValidSync(value);
  }

  validate(value: unknown): T {
    return this.schema.validateSync(value);
  }
}

export type YupMigrationParams<T> = Omit<
  LocalStorageItemMigration<T>,
  "schema"
> & {
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
    schema: new LocalStorageItemYupValidator(schema),
  };
}
