"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import numeral from "numeral";
import { useEffect } from "react";
import type { DateTimeAndNumeralProviderProps } from "./types";

// load the locale configs
import "./moment-locales/cn";
import "./moment-locales/en";
import "./moment-locales/vi";

import "./numeral-locales/cn";
import "./numeral-locales/en";
import "./numeral-locales/vi";

export function DateTimeAndNumeralProvider({
  children,
  locale,
  localeDatetime,
  localeNumeral,
  ...otherProps
}: DateTimeAndNumeralProviderProps) {
  useEffect(() => {
    if (!localeDatetime) return;
    moment.locale(localeDatetime);
  }, [localeDatetime]);

  useEffect(() => {
    if (!localeNumeral) return;
    numeral.locale(localeNumeral);
  }, [localeNumeral]);

  return (
    <LocalizationProvider
      {...otherProps}
      dateAdapter={AdapterMoment}
      adapterLocale={locale}
    >
      {children}
    </LocalizationProvider>
  );
}
