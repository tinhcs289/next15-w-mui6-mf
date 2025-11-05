import { afterEach, describe, expect, it, vi } from "vitest";
import { cookiesApi } from "./cookie-api";
import { CookieItem, CookieItemMigration } from "./cookie-item";

describe("CookieItem", () => {
  const KEY = "testKey";

  afterEach(() => {
    cookiesApi.remove(KEY);
  });

  //#region string
  it("[string] should initialize with null as default", () => {
    const item = new CookieItem<string>(KEY);
    expect(item.get()).toBeNull();
    expect(cookiesApi.get(KEY)).toBeNull();
  });

  it("[string] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new CookieItem<string>(KEY, { defaultValue: "default" });
    expect(item.get()).toBe("default");
    expect(cookiesApi.get(KEY)).toBe('"default"');
  });

  it("[string] should set value exactly", () => {
    const item = new CookieItem<string>(KEY);
    item.set("new");
    expect(item.get()).toBe("new");
    expect(cookiesApi.get(KEY)).toBe('"new"');
  });

  it("[string] should return existing value from cookies storage", () => {
    cookiesApi.set(KEY, "existing");
    const item = new CookieItem<string>(KEY);
    expect(item.get()).toBe("existing");
  });

  it("[string] should return existing value from cookies storage even if defaultValue option is provided", () => {
    cookiesApi.set(KEY, "existing");
    const item = new CookieItem<string>(KEY, {
      defaultValue: "default",
    });
    expect(item.get()).toBe("existing");
  });
  //#endregion

  //#region number
  it("[number] should initialize with null as default", () => {
    const item = new CookieItem<number>(KEY);
    expect(item.get()).toBeNull();
    expect(cookiesApi.get(KEY)).toBeNull();
  });

  it("[number] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new CookieItem<number>(KEY, { defaultValue: 1 });
    expect(item.get()).toBe(1);
    expect(cookiesApi.get(KEY)).toBe("1");
  });

  it("[number] should set value exactly", () => {
    const item = new CookieItem<number>(KEY);
    item.set(1);
    expect(item.get()).toBe(1);
    expect(cookiesApi.get(KEY)).toBe("1");
  });

  it("[number] should return existing value from cookies storage", () => {
    cookiesApi.set(KEY, JSON.stringify(2));
    const item = new CookieItem<number>(KEY);
    expect(item.get()).toBe(2);
  });

  it("[number] should return existing value from cookies storage even if defaultValue option is provided", () => {
    cookiesApi.set(KEY, JSON.stringify(3));
    const item = new CookieItem<number>(KEY, {
      defaultValue: 1,
    });
    expect(item.get()).toBe(3);
  });
  //#endregion

  //#region boolean
  it("[boolean] should initialize with null as default", () => {
    const item = new CookieItem<boolean>(KEY);
    expect(item.get()).toBeNull();
    expect(cookiesApi.get(KEY)).toBeNull();
  });

  it("[boolean] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new CookieItem<boolean>(KEY, { defaultValue: false });
    expect(item.get()).toBe(false);
    expect(cookiesApi.get(KEY)).toBe("false");
  });

  it("[boolean] should set value exactly", () => {
    const item = new CookieItem<boolean>(KEY);
    item.set(false);
    expect(item.get()).toBe(false);
    expect(cookiesApi.get(KEY)).toBe("false");
  });

  it("[boolean] should return existing value from cookies storage", () => {
    cookiesApi.set(KEY, JSON.stringify(false));
    const item = new CookieItem<boolean>(KEY);
    expect(item.get()).toBe(false);
  });

  it("[boolean] should return existing value from cookies storage even if defaultValue option is provided", () => {
    cookiesApi.set(KEY, JSON.stringify(false));
    const item = new CookieItem<boolean>(KEY, {
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
    const item = new CookieItem<TestObject>(KEY);
    expect(item.get()).toBeNull();
    expect(cookiesApi.get(KEY)).toBeNull();
  });

  it("[object] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new CookieItem<TestObject>(KEY, {
      defaultValue: { id: 123, name: "Nguyen Van A" },
    });
    expect(item.get()).toStrictEqual({ id: 123, name: "Nguyen Van A" });
    expect(cookiesApi.get(KEY)).toBe(
      JSON.stringify({ id: 123, name: "Nguyen Van A" })
    );
  });

  it("[object] should set value exactly", () => {
    const item = new CookieItem<TestObject>(KEY);
    item.set({ id: 123, name: "Nguyen Van A" });
    expect(item.get()).toStrictEqual({ id: 123, name: "Nguyen Van A" });
    expect(cookiesApi.get(KEY)).toBe(
      JSON.stringify({ id: 123, name: "Nguyen Van A" })
    );
  });

  it("[object] should return existing value from cookies storage", () => {
    cookiesApi.set(KEY, JSON.stringify({ id: 123, name: "Nguyen Van A" }));
    const item = new CookieItem<TestObject>(KEY);
    expect(item.get()).toStrictEqual({ id: 123, name: "Nguyen Van A" });
  });

  it("[object] should return existing value from cookies storage even if defaultValue option is provided", () => {
    cookiesApi.set(KEY, JSON.stringify({ id: 123, name: "Nguyen Van A" }));
    const item = new CookieItem<TestObject>(KEY, {
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
    const item = new CookieItem<ComplexTestObject>(KEY);
    expect(item.get()).toBeNull();
    expect(cookiesApi.get(KEY)).toBeNull();
  });

  it("[complex object] should initialize with default value if 'defaultValue' option was provide", () => {
    const item = new CookieItem<ComplexTestObject>(KEY, {
      defaultValue: {
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" },
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
      },
    });
    expect(item.get()).toStrictEqual({
      id: 123,
      name: "Nguyen Van A",
      parent: { id: 456, name: "Nguyen Van B" },
      childs: [
        { id: 789, name: "Nguyen Van C" },
        { id: 101112, name: "Nguyen Van D" },
      ],
      data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
    });
    expect(cookiesApi.get(KEY)).toBe(
      JSON.stringify({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" },
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
      })
    );
  });

  it("[complex object] should set value exactly", () => {
    const item = new CookieItem<ComplexTestObject>(KEY);
    item.set({
      id: 123,
      name: "Nguyen Van A",
      parent: { id: 456, name: "Nguyen Van B" },
      childs: [
        { id: 789, name: "Nguyen Van C" },
        { id: 101112, name: "Nguyen Van D" },
      ],
      data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
    });
    expect(item.get()).toStrictEqual({
      id: 123,
      name: "Nguyen Van A",
      parent: { id: 456, name: "Nguyen Van B" },
      childs: [
        { id: 789, name: "Nguyen Van C" },
        { id: 101112, name: "Nguyen Van D" },
      ],
      data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
    });
    expect(cookiesApi.get(KEY)).toBe(
      JSON.stringify({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" },
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
      })
    );
  });

  it("[complex object] should return existing value from cookies storage", () => {
    cookiesApi.set(
      KEY,
      JSON.stringify({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" },
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
      })
    );
    const item = new CookieItem<ComplexTestObject>(KEY);
    expect(item.get()).toStrictEqual({
      id: 123,
      name: "Nguyen Van A",
      parent: { id: 456, name: "Nguyen Van B" },
      childs: [
        { id: 789, name: "Nguyen Van C" },
        { id: 101112, name: "Nguyen Van D" },
      ],
      data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
    });
  });

  it("[complex object] should return existing value from cookies storage even if defaultValue option is provided", () => {
    cookiesApi.set(
      KEY,
      JSON.stringify({
        id: 123,
        name: "Nguyen Van A",
        parent: { id: 456, name: "Nguyen Van B" },
        childs: [
          { id: 789, name: "Nguyen Van C" },
          { id: 101112, name: "Nguyen Van D" },
        ],
        data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
      })
    );
    const item = new CookieItem<ComplexTestObject>(KEY, {
      defaultValue: { id: 456, name: "Nguyen Van B" },
    });
    expect(item.get()).toStrictEqual({
      id: 123,
      name: "Nguyen Van A",
      parent: { id: 456, name: "Nguyen Van B" },
      childs: [
        { id: 789, name: "Nguyen Van C" },
        { id: 101112, name: "Nguyen Van D" },
      ],
      data: JSON.stringify({ id: 456, name: "Nguyen Van B" }),
    });
  });
  //#endregion

  //#region main class
  it("[parse] should parse valid JSON from localStorage", () => {
    cookiesApi.set(KEY, JSON.stringify("value"));
    const item = new CookieItem<string>(KEY);
    expect(item.get()).toStrictEqual("value");
  });

  it("[migration] should run migrations in order and update version", () => {
    type Data = { name: string; age: number };
    const migrations: CookieItemMigration<any>[] = [
      {
        version: 1,
        migrate: (prev) => ({ ...prev, age: 0 }),
      },
      {
        version: 2,
        migrate: (prev) => ({ ...prev, migrated: true }),
      },
    ];

    cookiesApi.set(KEY, JSON.stringify({ name: "John" }));
    cookiesApi.set(`${KEY}.__version`, "0");

    const item = new CookieItem<Data>(KEY, { migrations });
    const value = item.get();

    expect(value).toEqual({ name: "John", age: 0, migrated: true });
    expect(cookiesApi.get(`${KEY}.__version`)).toBe("2");
  });

  it("[clear] should clear and return null if migration validation fails", () => {
    const migrations: CookieItemMigration<any>[] = [
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

    cookiesApi.set(KEY, JSON.stringify({ foo: "bar" }));
    cookiesApi.set(`${KEY}.__version`, "0");

    const item = new CookieItem<any>(KEY, { migrations });
    expect(item.get()).toBe(null);
  });

  it("[set] should set value and update version", () => {
    const migrations: CookieItemMigration<string>[] = [
      { version: 1, schema: { isValid: () => true, validate: (v) => v } },
    ];

    const item = new CookieItem<string>(KEY, { migrations });
    item.set("abc");
    expect(cookiesApi.get(KEY)).toBe(JSON.stringify("abc"));
    expect(cookiesApi.get(`${KEY}.__version`)).toBe("1");
  });

  it("[set] should not set invalid value", () => {
    const migrations: CookieItemMigration<string>[] = [
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

    const item = new CookieItem<string>(KEY, { migrations });
    vi.spyOn(console, "error").mockImplementation(() => {});

    item.set("invalid");
    expect(cookiesApi.get(KEY)).toBeNull();
  });

  it("[onChange] should call onChange callback when cookie changes", async () => {
    const item = new CookieItem<string>("test-onchange");
    const callback = vi.fn();

    const unsubscribe = item.onChange(callback);

    item.set("value1");
    await new Promise((r) => setTimeout(r, 2100));

    expect(callback).toHaveBeenCalledWith(null, "value1");

    item.set("value2");
    await new Promise((r) => setTimeout(r, 2100));
    expect(callback).toHaveBeenCalledWith("value1", "value2");

    unsubscribe();
  });

  it("[onChange] should not call onChange callback if skipTriggerChangeInThisTab option is used", async () => {
    const item = new CookieItem<string>("test-skip-trigger");
    const callback = vi.fn();

    const unsubscribe = item.onChange(callback);

    item.set("value1", { skipTriggerChangeInThisTab: true });
    await new Promise((r) => setTimeout(r, 2100));

    expect(callback).not.toHaveBeenCalled();

    item.set("value2");
    await new Promise((r) => setTimeout(r, 2100));
    expect(callback).toHaveBeenCalled();

    unsubscribe();
  });
  //#endregion
});
