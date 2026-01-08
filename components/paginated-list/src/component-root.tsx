import type { ReactNode } from "react";
import { StatesProvider } from "./context";
import { UpdateFilterInitializer } from "./init-filter";
import { InteractionInitializer } from "./init-interaction";
import { UpdatePagingInitializer } from "./init-paging";
import { SelectAllInitializer, SelectionInitializer, ClearSelectionWhenPageChanges } from "./init-selection";
import { UpdateSortInitializer } from "./init-sort";

export function PaginatedList({ children }: { children?: ReactNode }) {
  return (
    <StatesProvider>
      <SelectionInitializer />
      <SelectAllInitializer />
      <ClearSelectionWhenPageChanges />
      <InteractionInitializer />
      <UpdatePagingInitializer />
      <UpdateSortInitializer />
      <UpdateFilterInitializer />
      {children}
    </StatesProvider>
  );
}
