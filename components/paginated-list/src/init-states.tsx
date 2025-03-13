"use client";

import type { JSX } from "react";
import { memo, useEffect } from "react";
import { useInitState, useSetState } from "./context";
import type { Any, ListFilter, PaginatedListStates } from "./types";

export type ListStatesInitializerProps<Filter extends Any = Any> = {
  idField?: string;
  selectable?: boolean;
  pageIndex?: number;
  pageSize?: number;
  defaultFilter?: ListFilter<Filter>;
  fixedFilter?: ListFilter<Filter>;
  fetchDataOnFirstMount?: boolean;
  typeOfSelection?: PaginatedListStates["typeOfSelection"];
};

export const ListStatesInitializer = memo(
  ({
    idField = "id",
    selectable = true,
    typeOfSelection = "over-all-pages",
    pageIndex = 1,
    pageSize = 20,
    defaultFilter,
    fixedFilter,
  }: ListStatesInitializerProps) => {
    const init1 = useInitState("typeOfSelection", typeOfSelection, {
      when: "whenever-value-changes",
    });
    const init2 = useInitState("idField", idField, {
      when: "whenever-value-changes",
    });
    const init3 = useInitState("selectable", selectable, {
      when: "whenever-value-changes",
    });
    const init4 = useInitState("pageIndex", pageIndex, {
      when: "whenever-value-changes",
    });
    const init5 = useInitState("pageSize", pageSize, {
      when: "whenever-value-changes",
    });
    const init6 = useInitState("defaultFilter", defaultFilter, {
      when: "whenever-value-changes",
    });
    const init7 = useInitState("fixedFilter", fixedFilter, {
      when: "whenever-value-changes",
    });

    const setState = useSetState();

    useEffect(() => {
      const initialized =
        [init1, init2, init3, init4, init5, init6, init7].findIndex(
          (i) => !i
        ) !== -1;

      if (!initialized) return;
      setState((states) => ({
        ...states,
        initialized: { ...states?.initialized, states: true },
      }));
    }, [init1, init2, init3, init4, init5, init6, init7, setState]);

    return null;
  }
) as <Filter extends Any = Any>(
  props: ListStatesInitializerProps<Filter>
) => JSX.Element;

// @ts-ignore
ListStatesInitializer.displayName = "ListStatesInitializer";