import type { QueryClientProviderProps } from "react-query";

export type ReactQueryProviderProps = Omit<QueryClientProviderProps, 'client'>;