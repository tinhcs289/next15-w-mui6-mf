import { afterEach, describe, expect, it, vi } from "vitest";
import { LocalStorageItem, LocalStorageItemMigration } from "./local-storage-item";

describe("LocalStorageItem", () => {
  const KEY = "testKey";

  afterEach(() => {
    localStorage.removeItem(KEY);
  })

  //#region string
  it("[string] should initialize with null as default", () => {
    const item = new LocalStorageItem<string>(KEY);
    expect(item.get()).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("[string] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new LocalStorageItem<string>(KEY, { defaultValue: "default" });
    expect(item.get()).toBe("default");
    expect(localStorage.getItem(KEY)).toBe("\"default\"");
  });

  it("[string] should set value exactly", () => {
    const item = new LocalStorageItem<string>(KEY);
    item.set("new");
    expect(item.get()).toBe("new");
    expect(localStorage.getItem(KEY)).toBe("\"new\"");
  });

  it("[string] should return existing value from localStorage", () => {
    localStorage.setItem(KEY, "existing");
    const item = new LocalStorageItem<string>(KEY);
    expect(item.get()).toBe("existing");
  });

  it("[string] should return existing value from localStorage even if defaultValue option is provided", () => {
    localStorage.setItem(KEY, "existing");
    const item = new LocalStorageItem<string>(KEY, {
      defaultValue: "default",
    });
    expect(item.get()).toBe("existing");
  });
  //#endregion

  //#region number
  it("[number] should initialize with null as default", () => {
    const item = new LocalStorageItem<number>(KEY);
    expect(item.get()).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("[number] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new LocalStorageItem<number>(KEY, { defaultValue: 1 });
    expect(item.get()).toBe(1);
    expect(localStorage.getItem(KEY)).toBe("1");
  });

  it("[number] should set value exactly", () => {
    const item = new LocalStorageItem<number>(KEY);
    item.set(1);
    expect(item.get()).toBe(1);
    expect(localStorage.getItem(KEY)).toBe("1");
  });

  it("[number] should return existing value from localStorage", () => {
    localStorage.setItem(KEY, JSON.stringify(2));
    const item = new LocalStorageItem<number>(KEY);
    expect(item.get()).toBe(2);
  });

  it("[number] should return existing value from localStorage even if defaultValue option is provided", () => {
    localStorage.setItem(KEY, JSON.stringify(3));
    const item = new LocalStorageItem<number>(KEY, {
      defaultValue: 1,
    });
    expect(item.get()).toBe(3);
  });
  //#endregion

  //#region boolean
  it("[boolean] should initialize with null as default", () => {
    const item = new LocalStorageItem<boolean>(KEY);
    expect(item.get()).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("[boolean] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new LocalStorageItem<boolean>(KEY, { defaultValue: false });
    expect(item.get()).toBe(false);
    expect(localStorage.getItem(KEY)).toBe("false");
  });

  it("[boolean] should set value exactly", () => {
    const item = new LocalStorageItem<boolean>(KEY);
    item.set(false);
    expect(item.get()).toBe(false);
    expect(localStorage.getItem(KEY)).toBe("false");
  });

  it("[boolean] should return existing value from localStorage", () => {
    localStorage.setItem(KEY, JSON.stringify(false));
    const item = new LocalStorageItem<boolean>(KEY);
    expect(item.get()).toBe(false);
  });

  it("[boolean] should return existing value from localStorage even if defaultValue option is provided", () => {
    localStorage.setItem(KEY, JSON.stringify(false));
    const item = new LocalStorageItem<boolean>(KEY, {
      defaultValue: true,
    });
    expect(item.get()).toBe(false);
  });
  //#endregion

  //#region object
  type TestObject = {
    id: number;
    name: string;
  };

  it("[object] should initialize with null as default", () => {
    const item = new LocalStorageItem<TestObject>(KEY);
    expect(item.get()).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("[object] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new LocalStorageItem<TestObject>(KEY, {
      defaultValue: { id: 123, name: "Nguyen Van A" },
    });
    expect(item.get()).toStrictEqual({ id: 123, name: "Nguyen Van A" });
    expect(localStorage.getItem(KEY)).toBe(
      JSON.stringify({ id: 123, name: "Nguyen Van A" })
    );
  });

  it("[object] should set value exactly", () => {
    const item = new LocalStorageItem<TestObject>(KEY);
    item.set({ id: 123, name: "Nguyen Van A" });
    expect(item.get()).toStrictEqual({ id: 123, name: "Nguyen Van A" });
    expect(localStorage.getItem(KEY)).toBe(
      JSON.stringify({ id: 123, name: "Nguyen Van A" })
    );
  });

  it("[object] should return existing value from localStorage", () => {
    localStorage.setItem(
      KEY,
      JSON.stringify({ id: 123, name: "Nguyen Van A" })
    );
    const item = new LocalStorageItem<TestObject>(KEY);
    expect(item.get()).toStrictEqual({ id: 123, name: "Nguyen Van A" });
  });

  it("[object] should return existing value from localStorage even if defaultValue option is provided", () => {
    localStorage.setItem(KEY, JSON.stringify({ id: 123, name: "Nguyen Van A" }));
    const item = new LocalStorageItem<TestObject>(KEY, {
      defaultValue: { id: 456, name: "Nguyen Van B" },
    });
    expect(item.get()).toStrictEqual({ id: 123, name: "Nguyen Van A" });
  });
  //#endregion

  //#region complex object
  type ComplexTestObject = {
    id: number;
    name: string;
    parent?: ComplexTestObject;
    childs?: ComplexTestObject[];
    data?: string;
  };

  it("[complex object] should initialize with null as default", () => {
    const item = new LocalStorageItem<ComplexTestObject>(KEY);
    expect(item.get()).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("[complex object] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new LocalStorageItem<ComplexTestObject>(KEY, {
      defaultValue: {
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      },
    });
    expect(item.get()).toStrictEqual({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      });
    expect(localStorage.getItem(KEY)).toBe(
      JSON.stringify({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      })
    );
  });

  it("[complex object] should set value exactly", () => {
    const item = new LocalStorageItem<ComplexTestObject>(KEY);
    item.set({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      });
    expect(item.get()).toStrictEqual({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      });
    expect(localStorage.getItem(KEY)).toBe(
      JSON.stringify({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      })
    );
  });

  it("[complex object] should return existing value from localStorage", () => {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      })
    );
    const item = new LocalStorageItem<ComplexTestObject>(KEY);
    expect(item.get()).toStrictEqual({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      });
  });

  it("[complex object] should return existing value from localStorage even if defaultValue option is provided", () => {
    localStorage.setItem(KEY, JSON.stringify({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      }));
    const item = new LocalStorageItem<ComplexTestObject>(KEY, {
      defaultValue: { id: 456, name: "Nguyen Van B" },
    });
    expect(item.get()).toStrictEqual({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" }
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" })
      });
  });
  //#endregion

  //#region main class
  it("[parse] should parse valid JSON from localStorage", () => {
    localStorage.setItem(KEY, JSON.stringify("value"));
    const item = new LocalStorageItem<string>(KEY);
    expect(item.get()).toStrictEqual("value");
  });

  it("[migration] should run migrations in order and update version", () => {
    type Data = { name: string; age: number };
    const migrations: LocalStorageItemMigration<any>[] = [
      {
        version: 1,
        migrate: (prev) => ({ ...prev, age: 0 }),
      },
      {
        version: 2,
        migrate: (prev) => ({ ...prev, migrated: true }),
      },
    ];

    localStorage.setItem(KEY, JSON.stringify({ name: "John" }));
    localStorage.setItem(`${KEY}.__version`, "0");

    const item = new LocalStorageItem<Data>(KEY, { migrations });
    const value = item.get();

    expect(value).toEqual({ name: "John", age: 0, migrated: true });
    expect(localStorage.getItem(`${KEY}.__version`)).toBe("2");
  });

  it("[clear] should clear and return null if migration validation fails", () => {
    const migrations: LocalStorageItemMigration<any>[] = [
      {
        version: 1,
        schema: {
          // @ts-ignore
          isValid: (v) => v && typeof v.name === "string",
          validate: (v) => {
            // @ts-ignore
            if (!v || typeof v.name !== "string") throw new Error("Invalid");
            return v;
          },
        },
      },
    ];

    localStorage.setItem(KEY, JSON.stringify({ foo: "bar" }));
    localStorage.setItem(`${KEY}.__version`, "0");

    const item = new LocalStorageItem<any>(KEY, { migrations });
    expect(item.get()).toBe(null);
  });

  it("[set] should set value and update version", () => {
    const migrations: LocalStorageItemMigration<string>[] = [
      { version: 1, schema: { isValid: () => true, validate: (v) => v } },
    ];

    const item = new LocalStorageItem<string>(KEY, { migrations });
    item.set("abc");
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify("abc"));
    expect(localStorage.getItem(`${KEY}.__version`)).toBe("1");
  });

  it("[set] should not set invalid value", () => {
    const migrations: LocalStorageItemMigration<string>[] = [
      {
        version: 1,
        schema: {
          isValid: (v) => v === "valid",
          validate: (v) => {
            if (v !== "valid") throw new Error("Invalid");
            return v;
          },
        },
      },
    ];

    const item = new LocalStorageItem<string>(KEY, { migrations });
    vi.spyOn(console, "error").mockImplementation(() => {});

    item.set("invalid");
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("[onChange] should trigger change listeners on set and clear", () => {
    const item = new LocalStorageItem<string>(KEY);
    const cb = vi.fn();

    const off = item.onChange(cb);

    item.set("a");
    expect(cb).toHaveBeenCalledWith(null, "a", "value");

    item.set("b");
    expect(cb).toHaveBeenCalledWith("a", "b", "value");

    item.clear();
    expect(cb).toHaveBeenCalledWith("b", null, "clear");

    off();

    item.set("c");
    expect(cb).toHaveBeenCalledTimes(3);
  });

  it("[onChange] should trigger change on storage event for this key", () => {
    const item = new LocalStorageItem<string>(KEY);
    const cb = vi.fn();
    item.onChange(cb);

    const event = new StorageEvent("storage", {
      key: KEY,
      oldValue: JSON.stringify("old"),
      newValue: JSON.stringify("new"),
      storageArea: localStorage,
    });

    window.dispatchEvent(event);

    expect(cb).toHaveBeenCalledWith("old", "new", "value");
  });

  it("[onChange] should ignore storage event for other keys", () => {
    const item = new LocalStorageItem<string>(KEY);
    const cb = vi.fn();
    item.onChange(cb);

    const event = new StorageEvent("storage", {
      key: "otherKey",
      oldValue: "1",
      newValue: "2",
      storageArea: localStorage,
    });

    window.dispatchEvent(event);
    expect(cb).not.toHaveBeenCalled();
  });

  it("[onChange] should skip trigger change in this tab if option set", () => {
    const item = new LocalStorageItem<string>(KEY);
    const cb = vi.fn();
    item.onChange(cb);

    item.set("x", { skipTriggerChangeInThisTab: true });
    expect(cb).not.toHaveBeenCalled();

    // but if we simulate storage event from another tab, callback still runs
    const event = new StorageEvent("storage", {
      key: KEY,
      oldValue: null,
      newValue: JSON.stringify("x"),
      storageArea: localStorage,
    });
    window.dispatchEvent(event);
    expect(cb).toHaveBeenCalled();
  });

  it("[onChange] should call onChange callback when storage event for versionKey occurs", () => {
    const item = new LocalStorageItem<string>(KEY);
    const callback = vi.fn();
    item.onChange(callback);

    const versionKey = `${KEY}.__version`;
    const event = new StorageEvent("storage", {
      key: versionKey,
      oldValue: "1",
      newValue: "2",
      storageArea: localStorage,
      url: location.href,
    });

    window.dispatchEvent(event);

    expect(callback).toHaveBeenCalledWith(1, 2, "version");
    item.dispose();
  });

  it("[onChange] should NOT call onChange callback for unrelated storage events", () => {
    const item = new LocalStorageItem<string>(KEY);
    const callback = vi.fn();
    item.onChange(callback);

    const event = new StorageEvent("storage", {
      key: "some-other-key",
      oldValue: "old",
      newValue: "new",
      storageArea: localStorage,
      url: location.href,
    });

    window.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
    item.dispose();
  });

  it("[dispose] should remove event listener on dispose", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const item = new LocalStorageItem<string>(KEY);
    item.dispose();
    expect(removeSpy).toHaveBeenCalledWith("storage", item["handleStorageEvent"]);
  });
  //#endregion
});
