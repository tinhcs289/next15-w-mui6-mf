"use client";

export type LocalStorageItemChangeCallback<T> = (
  previousValue: T | null,
  newValue: T | null,
  eventType?: "value" | "version" | "clear",
) => void;

export interface LocalStorageItemSchemaValidator<T> {
  isValid(value: unknown): boolean;
  validate(value: unknown): T;
}

export type LocalStorageItemSetterOptions = {
  skipTriggerChangeInThisTab?: boolean;
};

export class DefaultValidator<T> implements LocalStorageItemSchemaValidator<T> {
  isValid(_value: unknown): boolean {
    return true;
  }

  validate(value: unknown): T {
    return value as T;
  }
}

const defaultValidator: LocalStorageItemSchemaValidator<unknown> = {
  isValid: (_value: unknown) => true,
  validate: (value: unknown) => value,
};

export type LocalStorageItemMigration<T> = {
  version: number;
  schema?: LocalStorageItemSchemaValidator<T>;
  migrate?: (prev: any) => any;
};

const defaultMigration: LocalStorageItemMigration<any> = {
  version: -1,
  schema: defaultValidator,
};

const lsApi = {
  get: localStorage.getItem.bind(localStorage),
  set: localStorage.setItem.bind(localStorage),
  remove: localStorage.removeItem.bind(localStorage),
};

export type LocalStorageItemOptions<T> = {
  migrations?: LocalStorageItemMigration<T>[];
  defaultValue?: T;
};

export class LocalStorageItem<T> {
  private key: string;
  private versionKey: string;
  private migrations: LocalStorageItemMigration<T>[];
  private listeners: Set<LocalStorageItemChangeCallback<T>> = new Set();

  private defaultValue?: T;
  constructor(key: string, options?: LocalStorageItemOptions<T>) {
    this.key = key;
    this.versionKey = `${key}.__version`;

    const { migrations, defaultValue } = options || {};

    this.defaultValue = defaultValue;

    const _migrations = (
      migrations?.length ? migrations : [defaultMigration]
    ) as LocalStorageItemMigration<T>[];
    this.migrations = _migrations.sort((a, b) => a.version - b.version);

    const existingRaw = lsApi.get(this.key);
    if (existingRaw === null && this.defaultValue !== undefined) {
      const latest = this.migrations.at(-1);
      if (latest) {
        lsApi.set(this.key, this.stringify(this.defaultValue));
        this.setVersion(latest.version);
      }
    }

    window.addEventListener("storage", this.handleStorageEvent);
  }

  private handleStorageEvent = (event: StorageEvent) => {
    if (event.key === this.key) {
      this.triggerChange(event.oldValue, event.newValue, "value");
    }
    if (event.key === this.versionKey) {
      this.triggerChange(event.oldValue, event.newValue, "version");
    }
  };

  private triggerChange(prevRaw: string | null, newRaw: string | null, changeType: "value" | "version" | "clear") {
    const previousValue = prevRaw ? this.parse(prevRaw) : null;
    const value = newRaw ? this.parse(newRaw) : null;
    this.listeners.forEach((callback) => callback(previousValue, value, changeType));
  }

  private parse(raw: string): T | null {
    if (!raw || !raw.trim() || raw === "null" || raw === "undefined")
      return null;

    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`Invalid JSON in "${this.key}", fallback to raw value ${raw}`, e);
      return raw as T;
    }
  }

  private stringify(value: T): string {
    return JSON.stringify(value);
  }

  private getVersion(): number {
    const raw = lsApi.get(this.versionKey);
    return raw ? parseInt(raw, 10) || 0 : 0;
  }

  private setVersion(version: number): void {
    lsApi.set(this.versionKey, version.toString());
  }

  get(): T | null {
    let value = this.parse(lsApi.get(this.key) ?? "null");

    if (
      value === null ||
      typeof value === "undefined" ||
      value === "" ||
      value === "null"
    ) {
      return null;
    }

    let currentVersion = this.getVersion();

    for (const m of this.migrations) {
      if (m.version > currentVersion) {
        const migrateFn = m.migrate ?? ((x: any) => x);
        value = migrateFn(value);
        currentVersion = m.version;
        this.setVersion(currentVersion);
      }
    }

    const latest = this.migrations.at(-1);
    const schema = latest?.schema ?? defaultValidator;
    if (latest && schema.isValid(value)) {
      lsApi.set(this.key, this.stringify(value as T));
      this.setVersion(latest.version);
      return value;
    }

    return null;
  }

  set(value: T | null, options?: LocalStorageItemSetterOptions): void {
    const latest = this.migrations.at(-1);
    if (!latest) {
      throw new Error("No schema available");
    }

    try {
      (latest.schema ?? defaultValidator).validate(value);
    } catch (error) {
      console.error(
        `[LocalStorageItem] Failed to validate value for key "${this.key}":`,
        error
      );
      return;
    }

    const prevRaw = lsApi.get(this.key);

    if (value === null) {
      lsApi.remove(this.key);
      this.setVersion(latest.version);
      if (!options?.skipTriggerChangeInThisTab) {
        this.triggerChange(prevRaw, null, "value");
      }
      return;
    }

    const nextRaw = this.stringify(value);

    lsApi.set(this.key, nextRaw);
    this.setVersion(latest.version);

    if (!options?.skipTriggerChangeInThisTab) {
      this.triggerChange(prevRaw, nextRaw, "value");
    }
  }

  clear(): void {
    const currentRaw = lsApi.get(this.key);
    lsApi.remove(this.key);
    lsApi.remove(this.versionKey);
    this.triggerChange(currentRaw, null, "clear");
  }

  onChange(callback: LocalStorageItemChangeCallback<T>): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  dispose() {
    window.removeEventListener("storage", this.handleStorageEvent);
    this.listeners.clear();
  }
}
