import * as y from "yup";
import { LocalStorageItem } from "./local-storage-item";
import { yupMigration } from "./adapters/yup";

const userSchemaV1 = y.object({
  id: y.string().required(),
  name: y.string().required(),
  email: y.string().email().required(),
  roles: y
    .array()
    .of(
      y
        .mixed<"admin" | "editor" | "viewer">()
        .oneOf(["admin", "editor", "viewer"])
    )
    .required(),
  settings: y.object({
    darkMode: y.boolean().required(),
    language: y.string().required(),
  }),
});

type User = y.InferType<typeof userSchemaV1>;

const defaultUser: User = {
  id: "u123",
  name: "Alice",
  email: "alice@example.com",
  roles: ["editor"],
  settings: {
    darkMode: true,
    language: "en",
  },
};

export const userStorage = new LocalStorageItem<User>("app_admin");

export const useStorageWithOption = new LocalStorageItem<User>(
  "app_versioned_admin",
  {
    defaultValue: defaultUser,
    migrations: [yupMigration({ version: 1, schema: userSchemaV1 })],
  }
);

userStorage.onChange((oldData, newData) => {
  console.log({ oldData, newData });
});