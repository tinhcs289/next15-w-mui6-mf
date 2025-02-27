"use client";

import get from "lodash/get";
import type { JSX } from "react";
import { memo, useCallback, useEffect, useRef } from "react";
import type { Any, DataTableProps } from "../types";
import { useGetState, useInitState, useSetState } from "./context-states";

function concatArray<T>(...arrs: T[][]) {
  let result = [] as T[];
  arrs.forEach((a) => {
    result = result.concat(a);
  });

  return result;
}

export const SelectAllInitializer = memo(() => {
  const setState = useSetState();
  const idField = useGetState((s) => s?.rowIdentity);

  const getId = useCallback(
    (item?: Any) => (!!idField ? (get(item, idField) as string) : ""),
    [idField]
  );

  const dataInPage = useGetState((s) => s.rows);
  const selectedRows = useGetState((s) => s.selectedRows);

  const checkAllItems = useCallback(
    (checked: boolean = true) => {
      setState({ isSelectedAll: checked });
      setTimeout(() => {
        if (!Array.isArray(dataInPage) || dataInPage.length === 0) return;
        if (checked) {
          const selecteds = concatArray(
            selectedRows || [],
            dataInPage.filter((i) => {
              const id = getId(i);
              if (!id) return false;
              return (selectedRows || []).findIndex((s) => getId(s) === id) < 0;
            })
          );
          setState({
            selectedRows: selecteds,
          });
        } else {
          const listUncheckIds = dataInPage.map((i) => getId(i));
          const selecteds = (selectedRows || []).filter(
            (i) => !listUncheckIds.includes(getId(i))
          );
          setState({
            selectedRows: selecteds,
          });
        }
      }, 0);
      return;
    },
    [getId, selectedRows, dataInPage, setState]
  );

  useInitState("checkAllItems", checkAllItems, {
    when: "whenever-value-changes",
  });

  const isSelectedRow = useCallback(
    (item: Any[]) => {
      if (!item) return false;
      const id = getId(item);
      if (typeof id === "undefined") return false;
      if (id === "") return false;

      if (!selectedRows?.length) return false;
      return selectedRows.findIndex((i) => getId(i) === id) !== -1;
    },
    [selectedRows, getId]
  );

  useInitState("isSelected", isSelectedRow, {
    when: "whenever-value-changes",
  });

  return null as unknown as JSX.Element;
});
SelectAllInitializer.displayName = "SelectAllInitializer";

export const SelectionInitializer = memo(() => {
  const setState = useSetState();
  const idField = useGetState((s) => s?.rowIdentity);

  const getId = useCallback(
    (item?: Any) => (!!idField ? (get(item, idField) as string) : ""),
    [idField]
  );

  const dataInPage = useGetState((s) => s.rows);
  const selectedRows = useGetState((s) => s.selectedRows);

  const isCheckAll = useCallback(
    (checks: Any[] = [], pageData: Any[] = []) => {
      if (!Array.isArray(checks) || checks.length === 0) return false;
      if (!Array.isArray(pageData) || pageData.length === 0) return false;
      if (checks.length < pageData.length) return false;
      let is = true,
        i = 0;
      while (is && i < pageData.length) {
        const item = pageData[i];
        if (checks.findIndex((check) => getId(check) === getId(item)) < 0)
          is = false;
        else i++;
      }
      return is;
    },
    [getId]
  );

  const checkOneItem = useCallback(
    (item: Any) => {
      if (!item) return;
      const id = getId(item);
      if (!id) return;
      const selectedItemIds = selectedRows?.map?.((i) => getId(i)) || [];
      const hasCheckedBefore = selectedItemIds.includes(id);
      const shouldChecked = !hasCheckedBefore;
      if (shouldChecked) {
        const selecteds = concatArray(selectedRows || [], [item]);
        const shouldCheckAll = isCheckAll(selecteds, dataInPage);
        setTimeout(() => {
          setState({ isSelectedAll: shouldCheckAll });
        }, 0);
        setTimeout(() => {
          setState({
            selectedRows: selecteds,
          });
        }, 0);
        return;
      } else {
        const selecteds = (selectedRows || []).filter((i) => getId(i) !== id);
        const shouldCheckAll = isCheckAll(selecteds, dataInPage);
        setTimeout(() => {
          setState({ isSelectedAll: shouldCheckAll });
        }, 0);
        setTimeout(() => {
          setState({
            selectedRows: selecteds,
          });
        }, 0);
        return;
      }
    },
    [getId, selectedRows, dataInPage, isCheckAll, setState]
  );

  useInitState("checkOrUnCheckItem", checkOneItem, {
    when: "whenever-value-changes",
  });

  return null;
});
SelectionInitializer.displayName = "SelectionInitializer";

export const OnSelectRowsInitializer = memo(
  ({ callback }: { callback?: DataTableProps["onSelectRows"] }) => {
    const selectedRows = useGetState((s) => s.selectedRows);
    const isStateChangesByInit = useRef(true);

    useEffect(() => {
      if (typeof callback !== "function") return;
      if (isStateChangesByInit.current) {
        isStateChangesByInit.current = false;
        return;
      }

      setTimeout(() => {
        callback(selectedRows || []);
      }, 0);
    }, [selectedRows, callback]);

    return null as unknown as JSX.Element;
  }
) as <RowData extends Any = Any>({
  callback,
}: {
  callback?: DataTableProps<RowData>["onSelectRows"];
}) => JSX.Element;
// @ts-ignore
OnSelectRowsInitializer.displayName = "OnSelectRowsInitializer";
