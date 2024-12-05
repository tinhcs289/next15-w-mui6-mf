"use client";

import type { QueryClientProviderProps } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";

export type ReactQueryProviderProps = Omit<QueryClientProviderProps, 'client'>;

const queryClient = new QueryClient();

export default function ReactQueryProvider({ children, ...otherProps }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider {...otherProps} client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}