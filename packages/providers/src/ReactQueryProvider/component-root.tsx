"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import type { ReactQueryProviderProps } from "./types";

const queryClient = new QueryClient();

export function ReactQueryProvider({
  children,
  ...otherProps
}: ReactQueryProviderProps) {
  return (
    <QueryClientProvider {...otherProps} client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
