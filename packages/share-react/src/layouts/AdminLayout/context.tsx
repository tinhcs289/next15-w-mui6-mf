"use client";

import type { AppLocale } from "@repo/types/locale";
import type { JSX } from "react";
import { createStatesContext } from "../../utils/states-context";

export type AdminLayoutStates = {
  locale?: AppLocale;
  openAppbarDrawer?: boolean;
  currentUrl?: string;
  zoneName?: string;
}

const {
  StatesProvider: AdminLayoutStatesProvider,
  useGetState: useGetAdminLayoutState,
  useDefineMethod: useDefineAdminLayoutMethod,
  useInitState: useInitAdminLayoutState,
  useSetState: useSetAdminLayoutState,
} = createStatesContext<AdminLayoutStates>({ openAppbarDrawer: false });

export {
  AdminLayoutStatesProvider,
  useGetAdminLayoutState,
  useDefineAdminLayoutMethod,
  useInitAdminLayoutState,
  useSetAdminLayoutState,
}


export function LocaleInitializer({ locale }: Pick<AdminLayoutStates, 'locale'>) {
  useInitAdminLayoutState("locale", locale, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}

export function CurrentUrlInitializer({ currentUrl }: Pick<AdminLayoutStates, 'currentUrl'>) {
  useInitAdminLayoutState("currentUrl", currentUrl, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}

export function ZoneNameInitializer({ zoneName }: Pick<AdminLayoutStates, 'zoneName'>) {
  useInitAdminLayoutState("zoneName", zoneName, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}