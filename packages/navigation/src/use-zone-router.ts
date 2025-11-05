"use client";

import { useRouter } from "./intl-navigation";
import { useLocale } from "next-intl";
import { useCallback } from "react";

export function useZoneRouter(currentZone?: string) {
  const router = useRouter();
  const currentLocale = useLocale();

  // Nếu không truyền currentZone, mặc định là zone chính: ""
  const zone = currentZone ?? "";

  const buildPath = useCallback((path: string, targetZone: string) => {
    const zonePrefix = targetZone === "" ? "" : `/${targetZone}`;
    return `${zonePrefix}${path.startsWith("/") ? path : "/" + path}`;
  }, []);

  const push = useCallback(
    (
      path: string,
      options?: { zone?: string; locale?: string } & Parameters<typeof router.push>[1]
    ) => {
      const { zone: targetZone = zone, locale = currentLocale, ...rest } = options ?? {};
      const fullPath = buildPath(path, targetZone);
      router.push(fullPath, { locale, ...rest });
    },
    [router, buildPath, zone, currentLocale]
  );

  const replace = useCallback(
    (
      path: string,
      options?: { zone?: string; locale?: string } & Parameters<typeof router.replace>[1]
    ) => {
      const { zone: targetZone = zone, locale = currentLocale, ...rest } = options ?? {};
      const fullPath = buildPath(path, targetZone);
      router.replace(fullPath, { locale, ...rest });
    },
    [router, buildPath, zone, currentLocale]
  );

  const prefetch = useCallback(
    (
      path: string,
      options?: { zone?: string; locale?: string } & Parameters<typeof router.prefetch>[1]
    ) => {
      const { zone: targetZone = zone, locale = currentLocale, ...rest } = options ?? {};
      const fullPath = buildPath(path, targetZone);
      router.prefetch(fullPath, { locale, ...rest });
    },
    [router, buildPath, zone, currentLocale]
  );

  const pushToMain = useCallback(
    (
      path: string,
      options?: Parameters<typeof router.push>[1]
    ) => {
      const locale = options?.locale ?? currentLocale;
      const fullPath = buildPath(path, "");
      router.push(fullPath, { locale, ...options });
    },
    [router, buildPath, currentLocale]
  );

  return {
    ...router,
    push,
    replace,
    prefetch,
    pushToMain,
  };
}
