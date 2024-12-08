import type { LocalizationProviderProps } from "@mui/x-date-pickers";
import type { Moment } from "moment";

export type DateTimeAndNumeralProviderProps = Omit<
  LocalizationProviderProps<Moment, string>,
  "dateAdapter" | "adapterLocale"
> & {
  locale?: string;
  localeDatetime?: string;
  localeNumeral?: string;
};