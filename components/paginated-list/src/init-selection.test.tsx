import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { StatesProvider, createStateHooks } from "./context";
import {
  SelectAllInitializer,
  SelectionInitializer,
  ClearSelectionWhenPageChanges,
} from "./init-selection";

const { useGetPaginatedListState, useSetPaginatedListState } =
  createStateHooks();

const wrapper = ({ children }: { children: ReactNode }) => (
  <StatesProvider>
    <SelectAllInitializer />
    <SelectionInitializer />
    <ClearSelectionWhenPageChanges />
    {children}
  </StatesProvider>
);

describe("Selection Initializers", () => {
  it("should register all properties and callbacks in context", async () => {
    const { result } = renderHook(
      () => ({
        selectedItems: useGetPaginatedListState((s) => s?.selectedItems),
        isSelectedAll: useGetPaginatedListState((s) => s?.isSelectedAll),
        isSelected: useGetPaginatedListState((s) => s?.isSelected),
        checkAllItems: useGetPaginatedListState((s) => s?.checkAllItems),
        checkOrUnCheckItem: useGetPaginatedListState(
          (s) => s?.checkOrUnCheckItem
        ),
        clearSelection: useGetPaginatedListState((s) => s?.clearSelection),
        setState: useSetPaginatedListState(),
      }),
      { wrapper }
    );

    await waitFor(() => result.current);

    act(() => {
      result.current.setState!({
        itemsInPage: [{ id: "item1" }, { id: "item2" }],
        items: [{ id: "item1" }, { id: "item2" }],
      });
    });

    expect(result.current.selectedItems).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
    expect(result.current.isSelected).toBeTypeOf("function");
    expect(result.current.checkAllItems).toBeTypeOf("function");
    expect(result.current.checkOrUnCheckItem).toBeTypeOf("function");
    expect(result.current.clearSelection).toBeTypeOf("function");
    expect(result.current.isSelected!({ id: "item1" })).toBe(false);

    act(() => {
      result.current.checkOrUnCheckItem!({ id: "item1" });
    });
    await waitFor(() => {
      expect(result.current.selectedItems).toStrictEqual([{ id: "item1" }]);
    });

    act(() => {
      result.current.clearSelection!();
    });
    expect(result.current.selectedItems).toEqual([]);
    expect(result.current.isSelectedAll).toBe(false);
  });

  it("should select all items on current page", async () => {
    const { result } = renderHook(
      () => ({
        checkAllItems: useGetPaginatedListState((s) => s?.checkAllItems),
        selectedItems: useGetPaginatedListState((s) => s?.selectedItems),
        isSelectedAll: useGetPaginatedListState((s) => s?.isSelectedAll),
        setState: useSetPaginatedListState(),
      }),
      { wrapper }
    );

    await waitFor(() => result.current);

    act(() => {
      result.current.setState({
        itemsInPage: [{ id: "1" }, { id: "2" }],
      });
    });

    act(() => {
      result.current.checkAllItems!(true);
    });

    await waitFor(() => {
      expect(result.current.isSelectedAll).toBe(true);
      expect(result.current.selectedItems!.map((i: any) => i.id)).toEqual([
        "1",
        "2",
      ]);
    });
  });

  it("should select and unselect single item correctly", async () => {
    const { result } = renderHook(
      () => ({
        checkOrUnCheckItem: useGetPaginatedListState(
          (s) => s?.checkOrUnCheckItem
        ),
        selectedItems: useGetPaginatedListState((s) => s?.selectedItems),
        setState: useSetPaginatedListState(),
      }),
      { wrapper }
    );

    await waitFor(() => result.current);

    act(() => {
      result.current.setState({
        itemsInPage: [{ id: "1" }, { id: "2" }],
      });
    });

    act(() => {
      result.current.checkOrUnCheckItem!({ id: "1" });
    });

    await waitFor(() => {
      expect(result.current.selectedItems).toStrictEqual([{ id: "1" }]);
    });

    act(() => {
      result.current.checkOrUnCheckItem!({ id: "1" });
    });

    await waitFor(() => {
      expect(result.current.selectedItems).toEqual([]);
    });
  });

  it("should clear selection when page changes in only-on-page mode", async () => {
    const { result } = renderHook(
      () => ({
        selectedItems: useGetPaginatedListState((s) => s?.selectedItems),
        setState: useSetPaginatedListState(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.setState({
        typeOfSelection: "only-on-page",
        itemsInPage: [{ id: "1" }],
        selectedItems: [{ id: "1" }],
      });
    });

    act(() => {
      result.current.setState({ itemsInPage: [{ id: "2" }] });
    });

    expect(result.current.selectedItems).toEqual([]);
  });

  it("should keep selection when page changes in over-all-pages mode", async () => {
    const { result } = renderHook(
      () => ({
        selectedItems: useGetPaginatedListState((s) => s?.selectedItems),
        setState: useSetPaginatedListState(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.setState({
        typeOfSelection: "over-all-pages",
        items: [{ id: "1" }, { id: "2" }],
        itemsInPage: [{ id: "1" }],
        selectedItems: [{ id: "1" }],
      });
    });

    act(() => {
      result.current.setState({ itemsInPage: [{ id: "2" }] });
    });

    expect(result.current.selectedItems!.map((i: any) => i.id)).toEqual(["1"]);
  });
});
