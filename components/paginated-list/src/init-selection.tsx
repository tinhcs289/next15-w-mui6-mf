"use client";

import get from "lodash/get";
import { memo, useCallback } from "react";
import { useGetState, useInitState, useSetState } from "./context";
import type { Any } from "./types";

function concatArray<T>(...arrs: T[][]) {
  let result = [] as T[];
  arrs.forEach((a) => {
    result = result.concat(a);
  });

  return result;
}


export const SelectAllInitializer = memo(() => {
  const setState = useSetState();
  const idField = useGetState((s) => s?.idField);

  const getId = useCallback(
    (item?: Any) => (!!idField ? (get(item, idField) as string) : ""),
    [idField]
  );

  const dataInPage = useGetState((s) => s.itemsInPage);
  const selectedItems = useGetState((s) => s.selectedItems);
  const isSelectable = useGetState((s) => !!s?.selectable);

  const checkAllItems = useCallback(
    (checked: boolean = true) => {
      if (!isSelectable) return;
      setState({ isSelectedAll: checked });
      setTimeout(() => {
        if (!Array.isArray(dataInPage) || dataInPage.length === 0) return;
        if (checked) {
          const selecteds = concatArray(
            selectedItems || [],
            dataInPage.filter((i) => {
              const id = getId(i);
              if (!id) return false;
              return (
                (selectedItems || []).findIndex((s) => getId(s) === id) < 0
              );
            })
          );
          setState({
            selectedItems: selecteds,
          });
        } else {
          const listUncheckIds = dataInPage.map((i) => getId(i));
          const selecteds = (selectedItems || []).filter(
            (i) => !listUncheckIds.includes(getId(i))
          );
          setState({
            selectedItems: selecteds,
          });
        }
      }, 0);
      return;
    },
    [getId, selectedItems, dataInPage, isSelectable, setState]
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

      if (!selectedItems?.length) return false;
      return selectedItems.findIndex((i) => getId(i) === id) !== -1;
    },
    [selectedItems, getId]
  );

  useInitState("isSelected", isSelectedRow, {
    when: "whenever-value-changes",
  });

  return null;
});

SelectAllInitializer.displayName = "SelectAllInitializer";

export const SelectionInitializer = memo(() => {
  const setState = useSetState();
  const idField = useGetState((s) => s?.idField);

  const getId = useCallback(
    (item?: Any) => (!!idField ? (get(item, idField) as string) : ""),
    [idField]
  );

  const dataInPage = useGetState((s) => s.itemsInPage);
  const selectedItems = useGetState((s) => s.selectedItems);
  const isSelectable = useGetState((s) => !!s?.selectable);

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
      if (!isSelectable) return;
      if (!item) return;
      const id = getId(item);
      if (!id) return;
      const selectedItemIds = selectedItems?.map?.((i) => getId(i)) || [];
      const hasCheckedBefore = selectedItemIds.includes(id);
      const shouldChecked = !hasCheckedBefore;
      if (shouldChecked) {
        const selecteds = concatArray(selectedItems || [], [item]);
        const shouldCheckAll = isCheckAll(selecteds, dataInPage);
        setTimeout(() => {
          setState({ isSelectedAll: shouldCheckAll });
        }, 0);
        setTimeout(() => {
          setState({
            selectedItems: selecteds,
          });
        }, 0);
        return;
      } else {
        const selecteds = (selectedItems || []).filter((i) => getId(i) !== id);
        const shouldCheckAll = isCheckAll(selecteds, dataInPage);
        setTimeout(() => {
          setState({ isSelectedAll: shouldCheckAll });
        }, 0);
        setTimeout(() => {
          setState({
            selectedItems: selecteds,
          });
        }, 0);
        return;
      }
    },
    [getId, selectedItems, dataInPage, isSelectable, isCheckAll, setState]
  );

  useInitState("checkOrUnCheckItem", checkOneItem, {
    when: "whenever-value-changes",
  });

  return null;
});

SelectionInitializer.displayName = "SelectionInitializer";


