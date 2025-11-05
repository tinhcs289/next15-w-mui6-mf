import type { QueryClientProviderProps } from "@tanstack/react-query";

export type ReactQueryProviderProps = Omit<QueryClientProviderProps, 'client'>;