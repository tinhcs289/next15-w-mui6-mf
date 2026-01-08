"use client";

import { cookiesApi } from "./cookie-api";

export type CookieChangeCallback<T> = (prev: T | null, curr: T | null) => void;

class CookiePolling {
  private static instance: CookiePolling;
  private keys: Map<string, Set<CookieChangeCallback<any>>> = new Map();
  private cache: Map<string, string | null> = new Map();
  private intervalId?: number;
  private pollingInterval: number;

  private constructor(pollingInterval = 2000) {
    this.pollingInterval = pollingInterval;
  }

  public static getInstance(): CookiePolling {
    if (!CookiePolling.instance) {
      CookiePolling.instance = new CookiePolling();
    }
    return CookiePolling.instance;
  }

  public subscribe<T>(
    key: string,
    callback: CookieChangeCallback<T>
  ): () => void {
    if (!this.keys.has(key)) {
      this.keys.set(key, new Set());
      this.cache.set(key, cookiesApi.get(key));
    }
    this.keys.get(key)!.add(callback);

    if (!this.intervalId) {
      this.startPolling();
    }

    return () => {
      this.keys.get(key)?.delete(callback);
      if (this.keys.get(key)?.size === 0) {
        this.keys.delete(key);
        this.cache.delete(key);
      }
      if (this.keys.size === 0) {
        this.stopPolling();
      }
    };
  }

  private startPolling() {
    if (typeof window !== "undefined") {
      this.intervalId = window.setInterval(
        () => this.poll(),
        this.pollingInterval
      );
    }
  }

  private stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private poll() {
    this.keys.forEach((callbacks, key) => {
      const oldRaw = this.cache.get(key) ?? null;
      const newRaw = cookiesApi.get(key);

      if (oldRaw !== newRaw) {
        this.cache.set(key, newRaw);
        const prevValue = oldRaw !== null ? this.safeParse(key, oldRaw) : null;
        const currValue = newRaw !== null ? this.safeParse(key, newRaw) : null;
        callbacks.forEach((cb) => cb(prevValue, currValue));
      }
    });
  }

  private safeParse<T>(key: string, raw: string): T | null {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`Invalid JSON in "${key}", fallback to null`, e);
      return null;
    }
  }
}

export interface CookieItemSchemaValidator<T> {
  isValid(value: unknown): boolean;
  validate(value: unknown): T;
}

export type CookieItemMigration<T> = {
  version: number;
  schema?: CookieItemSchemaValidator<T>;
  migrate?: (prev: any) => any;
};

const defaultValidator: CookieItemSchemaValidator<unknown> = {
  isValid: (_value: unknown) => true,
  validate: (value: unknown) => value,
};

const defaultMigration: CookieItemMigration<any> = {
  version: -1,
  schema: defaultValidator,
};

export type CookieItemSetterOptions = {
  skipTriggerChangeInThisTab?: boolean;
};

export type CookieItemOptions<T> = {
  migrations?: CookieItemMigration<T>[];
  defaultValue?: T;
};

export class CookieItem<T> {
  key: string;
  private versionKey: string;
  private defaultValue?: T;
  private migrations: CookieItemMigration<T>[];
  private listeners = new Set<CookieChangeCallback<T>>();
  private unsubscribePolling?: () => void;
  private isChangeActor = false;
  private skipTriggerInThisTab = false;

  constructor(key: string, options?: CookieItemOptions<T>) {
    this.key = key;
    this.versionKey = `${key}.__version`;
    this.defaultValue = options?.defaultValue;

    const _migrations = (
      options?.migrations?.length ? options.migrations : [defaultMigration]
    ) as CookieItemMigration<T>[];
    this.migrations = _migrations.sort((a, b) => a.version - b.version);

    const existingRaw = cookiesApi.get(this.key);
    if (existingRaw === null && this.defaultValue !== undefined) {
      const latest = this.migrations.at(-1);
      if (latest) {
        cookiesApi.set(this.key, this.stringify(this.defaultValue));
        this.setVersion(latest.version);
      }
    }
  }

  private parse(raw: string): T | null {
    if (!raw || !raw.trim() || raw === "null" || raw === "undefined")
      return null;

    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn(
        `Invalid JSON in "${this.key}", fallback to raw value ${raw}`,
        e
      );
      return raw as T;
    }
  }

  private stringify(value: T): string {
    return JSON.stringify(value);
  }

  private getVersion(): number {
    const raw = cookiesApi.get(this.versionKey);
    return raw ? parseInt(raw, 10) || 0 : 0;
  }

  private setVersion(version: number): void {
    cookiesApi.set(this.versionKey, version.toString());
  }

  get(): T | null {
    let value = this.parse(cookiesApi.get(this.key) ?? "null");

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

    if (value === null) {
      this.clear();
      return null;
    }

    if (latest && schema.isValid(value)) {
      cookiesApi.set(this.key, this.stringify(value));
      this.setVersion(latest.version);
      return value;
    }

    this.clear();
    return null;
  }

  set(value: T | null, options?: CookieItemSetterOptions): void {
    const latest = this.migrations.at(-1);
    if (!latest) throw new Error("No schema available");

    try {
      (latest.schema ?? defaultValidator).validate(value);
    } catch (error) {
      console.error(
        `[CookieItem] Failed to validate value for key "${this.key}":`,
        error
      );
      return;
    }

    const nextRaw = value === null ? "null" : this.stringify(value);

    cookiesApi.set(this.key, nextRaw);
    this.setVersion(latest.version);

    if (options?.skipTriggerChangeInThisTab) {
      this.isChangeActor = true;
      this.skipTriggerInThisTab = true;
    }
  }

  clear(): void {
    cookiesApi.remove(this.key);
    cookiesApi.remove(this.versionKey);
  }

  onChange(callback: CookieChangeCallback<T>): () => void {
    if (this.listeners.size === 0) {
      const polling = CookiePolling.getInstance();
      this.unsubscribePolling = polling.subscribe<T>(
        this.key,
        (previous, current) => {
          const previousValue = previous ?? this.defaultValue ?? null;
          const value = current ?? this.defaultValue ?? null;

          const isSelfChange = this.isChangeActor && this.skipTriggerInThisTab;

          if (isSelfChange) {
            this.isChangeActor = false;
            this.skipTriggerInThisTab = false;
            return; // Skip calling callbacks
          }

          this.listeners.forEach((cb) => cb(previousValue, value));
        }
      );
    }

    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0 && this.unsubscribePolling) {
        this.unsubscribePolling();
        this.unsubscribePolling = undefined;
      }
    };
  }

  dispose() {
    this.listeners.clear();
    if (this.unsubscribePolling) {
      this.unsubscribePolling();
      this.unsubscribePolling = undefined;
    }
  }
}
