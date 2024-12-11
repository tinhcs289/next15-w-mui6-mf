"use client";

import type { AppLocale } from "@repo/types/locale";
import type { JSX } from "react";
import { createStatesContext } from "../../utils/states-context";

export type MainLayoutStates = {
  locale?: AppLocale;
  openAppbarDrawer?: boolean;
  currentUrl?: string;
  zoneName?: string;
}

export const {
  StatesProvider: MainLayoutStatesProvider,
  useGetState: useGetMainLayoutState,
  useDefineMethod: useDefineAppbarMethod,
  useInitState: useInitMainLayoutState,
  useSetState: useSetMainLayoutState,
} = createStatesContext<MainLayoutStates>({ openAppbarDrawer: false });

export function LocaleInitializer({ locale }: Pick<MainLayoutStates, 'locale'>) {
  useInitMainLayoutState("locale", locale, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}

export function CurrentUrlInitializer({ currentUrl }: Pick<MainLayoutStates, 'currentUrl'>) {
  useInitMainLayoutState("currentUrl", currentUrl, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}

export function ZoneNameInitializer({ zoneName }: Pick<MainLayoutStates, 'zoneName'>) {
  useInitMainLayoutState("zoneName", zoneName, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}