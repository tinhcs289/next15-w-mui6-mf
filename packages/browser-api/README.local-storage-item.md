[< back](./README.md)

# Local Storage utility
A lightweight and type-safe abstraction layer for working with browser `localStorage` APIs, with built-in support for schema validation, versioned data migrations, and cross-tab synchronization.

This package is modular, allowing you to use only what you need — including optional schema adapters for [`Yup`](https://github.com/jquense/yup) and [`Zod`](https://github.com/colinhacks/zod).

## ✨ Features
- ✅ Type-safe `localStorage` abstraction
- ✅ Schema validation (via custom validator, Yup, or Zod)
- ✅ Data versioning and migration
- ✅ Cross-tab synchronization
- ✅ Reactive `onChange` listener
- ✅ Minimal runtime footprint (tree-shakable)

## 📦 Import
```typescript
import { LocalStorageItem } "@packages/browser-api/local-storage-item";
```

## 🔌 Usage
```typescript
import { LocalStorageItem } from "@packages/browser-api/local-storage-item";

type User = {
  id: string;
  name: string;
  email: string;
};

const userStorage = new LocalStorageItem<User>("user", {
  defaultValue: {
    id: "u001",
    name: "Alice",
    email: "alice@example.com",
  },
});

userStorage.set({ id: "u002", name: "Bob", email: "bob@example.com" });

const user = userStorage.get(); // Validated + migrated User object

userStorage.onChange((prev, next) => {
  console.log("User data changed:", prev, next);
});
```

## 🔌 Validations and Migrations
``` typescript
import {
  LocalStorageItem,
  LocalStorageItemSchemaValidator,
  LocalStorageItemMigration,
} from "@packages/browser-api/local-storage-item";


type User = {
  id: string;
  name: string;
  age: number;
};

const userValidator: LocalStorageItemSchemaValidator<User> = {
  isValid: (value): value is User =>
    typeof value === "object" &&
    value !== null &&
    typeof (value as any).id === "string" &&
    typeof (value as any).name === "string" &&
    typeof (value as any).age === "number",

  validate: (value): User => {
    if (!userValidator.isValid(value)) {
      throw new Error("Invalid user object");
    }
    return value;
  },
};

const userStorage = new LocalStorageItem<User>("user", {
  defaultValue: { id: "u1", name: "Alice", age: 30 },
  migrations: [
    {
      version: 1,
      schema: userValidator,
    },
    // ... other schemas sorted by version
  ],
});
```
## 🔌 With Yup
```typescript
import * as yup from "yup";
import { LocalStorageItem } from "@packages/browser-api/local-storage-item";
import { yupMigration } from "@packages/browser-api/local-storage-item/adapters/yup";

const userSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
});

type User = yup.InferType<typeof userSchema>;

const userStorage = new LocalStorageItem<User>("user", {
  defaultValue: {
    id: "u1",
    name: "Alice",
    email: "alice@example.com",
  },
  migrations: [
    yupMigration({
      version: 1,
      schema: userSchema,
    }),
  ],
});
```

## 🔌 With Zod
```typescript
import { z } from "zod";
import { LocalStorageItem } from "@packages/browser-api/local-storage-item";
import { zodMigration } from "@packages/browser-api/local-storage-item/adapters/zod";

const settingsSchema = z.object({
  theme: z.enum(["light", "dark"]),
  language: z.string(),
});

type Settings = z.infer<typeof settingsSchema>;

const settingsStorage = new LocalStorageItem<Settings>("settings", {
  defaultValue: { theme: "dark", language: "en" },
  migrations: [
    zodMigration({
      version: 1,
      schema: settingsSchema,
    }),
  ],
});
```
## 🔌 with React Context/useSyncExternalStore
```typescript
// user-context.tsx
import { createContext, useContext, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { userStorage } from "./user-storage";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const userStore = useSyncExternalStore(
    userStorage.onChange, // subscribe
    () => userStorage.get(), // getSnapshot (client)
    () => null // getServerSnapshot (SSR fallback)
  );

  return (
    <UserContext.Provider
      value={{
        user: userStore,
        setUser: userStorage.set,
        clearUser: userStorage.clear
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};

// UserInfo.tsx
import { UserProvider, useUserStore } from "./user-context";

function UserInfo() {
  const { user, setUser, clearUser } = useUserStore();

  return (
    <div>
      <h2>User Info</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <button
        onClick={() =>
          setUser({
            id: "u999",
            name: "Updated Name",
            email: "updated@example.com",
          })
        }
      >
        Update User
      </button>

      <button onClick={clearUser}>Clear User</button>
    </div>
  );
}
```

## 🧠 How it works
The `LocalStorageItem<T>` class is an object-oriented wrapper around a single `localStorage` key, designed to add schema validation, data versioning, multi-tab sync, and lifecycle management.
#### 1. Initialization
When creating an instance, you provides:

- A unique key in `localStorage`

- An optional defaultValue

- An optional list of migrations, each containing a version number, a schema validator, and a migration function

The latest version in the list becomes the active version.

#### 2. Reading Data – .get()
When you call .get():

- Raw data is fetched from localStorage and parsed via JSON.parse

- The current version is checked

- If the stored version is outdated, migration functions are executed sequentially to update the data

- The final result is validated against the schema

  * If valid → the value is returned

  * If invalid → the data is cleared and null is returned

#### 3. Writing Data – .set(value)

When you call .set(value):

- The value is validated using the current schema

- The value is saved into localStorage as a JSON string

- The associated version is updated

- All registered listeners are triggered with the old and new values

#### 4. Cross-tab Sync – `storage` Event
Browsers trigger a `storage` event when `localStorage` changes from another tab.

This class listens to that event to:

- Detect changes to the target key or its version

- Trigger local change callbacks via `.onChange()` to synchronize UI or state in the current tab

#### 5. Lifecycle Methods

- `.onChange(callback)` → Registers a change listener

- `.clear()` → Removes both value and version from localStorage and notifies listeners

- `.dispose()` → Cleans up all listeners and event handlers

#### 6. Schema Validation

Data is validated through the LocalStorageItemSchemaValidator<T> interface, which includes:

- `isValid(value): boolean`

- `validate(value): T`

You can plug in your own validator or use built-in adapters for `Yup` or `Zod`.

#### 7. Data Migration

Schema migrations are handled through a simple but effective versioning mechanism.

- Each migration entry includes a version number, an optional schema, and an optional `migrate()` function.
- You provide a list of migrations, and they are automatically sorted in ascending order by version.
- A special localStorage key is created to track the version of the stored data. If your key is "`my_data`", the `version` number is stored under "`my_data.__version`".
- Version flow in `.get()`:
  * When `.get()` is called, the current version of the stored data is read from "`your_key.__version`". If no version is stored, it's assumed to be `0`.
  * The list of migrations is traversed in order. If a migration has `version > currentStoredVersion`, it is applied. The `migrate()` function transforms the value. After applying the migration, the version is updated in `localStorage`.
  * After all necessary migrations are applied, the final data is validated with the latest schema.
- This ensures that:
  * Older data formats are automatically upgraded without breaking your app
  * You always know what version of your schema is stored
  * Migrations are only run once per version, thanks to version tracking via "`your_key.__version`"
