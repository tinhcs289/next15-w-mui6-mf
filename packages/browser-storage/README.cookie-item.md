[< back](./README.md)

# Browser Cookies utility
A lightweight and type-safe abstraction layer for working with browser `cookies` APIs, with built-in support for schema validation, versioned data migrations, and cross-tab synchronization.

This package is modular, allowing you to use only what you need — including optional schema adapters for [`Yup`](https://github.com/jquense/yup) and [`Zod`](https://github.com/colinhacks/zod).

## ✨ Features
- ✅ Type-safe `cookies` abstraction
- ✅ Schema validation (via custom validator, Yup, or Zod)
- ✅ Data versioning and migration
- ✅ Reactive `change` tracking
- ✅ Minimal runtime footprint (tree-shakable)

## 📦 Import
```typescript
import { CookieItem } "@shared/browser-storage/cookie-item";
```

## 🔌 Usage
```typescript
import { CookieItem } from "@shared/browser-storage/cookie-item";

type User = {
  id: string;
  name: string;
  email: string;
};

const userCookie = new CookieItem<User>("user", {
  defaultValue: {
    id: "u001",
    name: "Alice",
    email: "alice@example.com",
  },
});

userCookie.set({ id: "u002", name: "Bob", email: "bob@example.com" });

const user = userCookie.get(); // Validated + migrated User object

userCookie.onChange((prev, next) => {
  console.log("User data changed:", prev, next);
});
```

## 🔌 Validations and Migrations
``` typescript
import {
  CookieItem,
  CookieItemSchemaValidator,
  CookieItemMigration,
} from "@shared/browser-storage/cookie-item";


type User = {
  id: string;
  name: string;
  age: number;
};

const userValidator: CookieItemSchemaValidator<User> = {
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

const userCookie = new CookieItem<User>("user", {
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
import { CookieItem } from "@shared/browser-storage/cookie-item";
import { yupMigration } from "@shared/browser-storage/cookie-item/adapters/yup";

const userSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
});

type User = yup.InferType<typeof userSchema>;

const userStorage = new CookieItem<User>("user", {
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
import { CookieItem } from "@shared/browser-storage/cookie-item";
import { zodMigration } from "@shared/browser-storage/cookie-item/adapters/zod";

const settingsSchema = z.object({
  theme: z.enum(["light", "dark"]),
  language: z.string(),
});

type Settings = z.infer<typeof settingsSchema>;

const settingsStorage = new CookieItem<Settings>("settings", {
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
import { userCookie } from "./user-cookie";

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

## 🧠 How It Works

