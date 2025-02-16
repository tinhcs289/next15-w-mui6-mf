import type { ReactNode } from "react";
import { StatesProvider } from "./context";
import { UpdateFilternitializer } from "./init-filter";
import { InteractionInitializer } from "./init-interaction";
import { UpdatePagingInitializer } from "./init-paging";
import { SelectAllInitializer, SelectionInitializer } from "./init-selection";
import { UpdateSortInitializer } from "./init-sort";

export function PaginatedList({ children }: { children?: ReactNode }) {
  return (
    <StatesProvider>
      <SelectionInitializer />
      <SelectAllInitializer />
      <InteractionInitializer />
      <UpdatePagingInitializer />
      <UpdateSortInitializer />
      <UpdateFilternitializer />
      {children}
    </StatesProvider>
  );
}
