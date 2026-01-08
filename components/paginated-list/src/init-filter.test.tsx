import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createStateHooks, StatesProvider } from "./context";
import { FetchDataInitializer } from "./init-fetch-data";
import { UpdateFilterInitializer } from "./init-filter";
import type { Any, ListFilter } from "./types";

type TestStates = {
  fetchData?: (payload?: Any, options?: Any) => void;
  updateFilter?: (filter: ListFilter, keepCurrentFilter?: boolean) => void;
  advanceFilter?: ListFilter;
};

const { useGetPaginatedListState, useSetPaginatedListState } =
  createStateHooks<TestStates>();

const mockGetList = vi.fn(async () => ({
  result: [],
  totalCount: 0,
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <StatesProvider>
    <FetchDataInitializer onGetList={mockGetList} />
    <UpdateFilterInitializer />
    {children}
  </StatesProvider>
);

describe("UpdateFilterInitializer", () => {
  it("should register updateFilter in state", async () => {
    const { result } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateFilter),
      { wrapper }
    );

    await waitFor(() => expect(result.current).toBeTypeOf("function"));
  });

  it("should call fetchData with payload-only when keepCurrentFilter=false", async () => {
    const { result } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateFilter),
      { wrapper }
    );

    await waitFor(() => result.current);

    act(() => {
      result.current!({ name: "John" }, false);
    });

    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));

    const args = (mockGetList.mock.calls as any[]).at(0)?.[0];
    expect(args.advanceFilter).toEqual({ name: "John" });
  });

  it("should call fetchData with payload-and-current-states when keepCurrentFilter=true", async () => {
    const { result } = renderHook(
      () => {
        const setState = useSetPaginatedListState();
        const updateFilterCallback = useGetPaginatedListState((s) => s?.updateFilter);
        return { setState, updateFilterCallback }
      },
      { wrapper }
    );

    act(() => {
      result.current.setState((s) => ({
        ...s,
        advanceFilter: { age: 25 },
      }));
    });

    await waitFor(() => result.current);

    act(() => {
      result.current.updateFilterCallback!({ name: "Alice" }, true);
    });

    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));

    const args = (mockGetList.mock.calls as any[]).at(0)?.[0];
    expect(args.advanceFilter).toMatchObject({
      name: "Alice",
      age: 25,
    });
  });

  it("should not call fetchData when filter is empty", async () => {
    const { result } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateFilter),
      { wrapper }
    );

    await waitFor(() => result.current);

    act(() => {
      result.current!({});
    });

    await new Promise((r) => setTimeout(r, 50));

    expect(mockGetList).not.toHaveBeenCalled();
  });

  it("should not call fetchData when filter is not an object", async () => {
    const { result } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateFilter),
      { wrapper }
    );

    await waitFor(() => result.current);

    act(() => {
      result.current!("not-an-object" as unknown as ListFilter<Any>);
    });

    await new Promise((r) => setTimeout(r, 50));

    expect(mockGetList).not.toHaveBeenCalled();
  });

  it("should correctly handle multiple consecutive updates", async () => {
    const { result: updateFilterCallback } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateFilter),
      { wrapper }
    );

    await waitFor(() => updateFilterCallback.current);

    act(() => {
      updateFilterCallback.current!({ name: "Tom" }, true);
    });

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledTimes(1);
    });

    act(() => {
      updateFilterCallback.current!({ age: 40 }, true);
    });

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledTimes(2);
    });

    const lastArgs = (mockGetList.mock.calls as any[]).at(-1)?.[0];
    expect(lastArgs.advanceFilter).toMatchObject({
      name: "Tom",
      age: 40,
    });
  });
});
