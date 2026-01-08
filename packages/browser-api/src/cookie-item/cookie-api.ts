"use client";

export const cookiesApi =
  typeof document === "undefined" || typeof document.cookie === "undefined"
    ? {
        get(name: string): string | null {
          return null;
        },
        set(name: string, value: string, options: { days?: number } = {}) {
          // no-op
        },
        remove(name: string) {
          // no-op
        },
      }
    : {
        get(name: string): string | null {
          const match = document.cookie.match(
            new RegExp("(^| )" + name + "=([^;]+)")
          );
          return match ? decodeURIComponent(match[2] as string) : null;
        },

        set(name: string, value: string, options: { days?: number } = {}) {
          const expires = options.days
            ? "; expires=" +
              new Date(Date.now() + options.days * 864e5).toUTCString()
            : "";
          document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
        },

        remove(name: string) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        },
      };
