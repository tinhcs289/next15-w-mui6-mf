import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createStateHooks, StatesProvider } from "./context";
import { FetchDataInitializer } from "./init-fetch-data";
import { UpdateSortInitializer } from "./init-sort";
import type { SortOperator } from "./types";

type TestStates = {
  sortBy: SortOperator[];
  fetchData?: (payload: any, meta: any) => void;
  updateSort?: (by: SortOperator[], keepCurrentSorting?: boolean) => void;
};

const { useGetPaginatedListState, useSetPaginatedListState } =
  createStateHooks<TestStates>();

const mockGetList = vi.fn(async (_payload: any) => ({
  result: [],
  totalCount: 0,
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <StatesProvider>
    <FetchDataInitializer onGetList={mockGetList} />
    <UpdateSortInitializer />
    {children}
  </StatesProvider>
);

describe("UpdateSortInitializer", () => {
  it("should register updateSort function in state", async () => {
    const { result } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateSort),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current).toBeTypeOf("function");
    });
  });

  it("should call fetchData with new sortBy when keepCurrentSorting=false", async () => {
    const { result: updateSortCallback } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateSort),
      { wrapper }
    );

    await waitFor(() => {
      if (!updateSortCallback.current) throw new Error("updateSort not ready yet");
    });

    act(() => {
      const newSort: SortOperator[] = [{ by: "name", direction: "asc" }];
      updateSortCallback.current!(newSort);
    });

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledTimes(1);
    });

    const lastCallArgs = (mockGetList.mock.calls as any[]).at(-1)?.[0];
    expect(lastCallArgs.sortBy).toEqual([{ by: "name", direction: "asc" }]);
  });

  it("should merge with existing sortBy when keepCurrentSorting=true", async () => {
    const { result } = renderHook(() => {
      const setState = useSetPaginatedListState();
      const sortByState = useGetPaginatedListState((s) => s?.sortBy);
      const updateSortCallback = useGetPaginatedListState((s) => s?.updateSort);

      return {
        setState, updateSortCallback, sortByState
      }
    }, {
      wrapper,
    });

    mockGetList.mockImplementationOnce(async (payload: any) => {
      result.current.setState((s) => ({
        ...s,
        sortBy: payload.sortBy,
      }));
      return { result: [], totalCount: 0 };
    });

    act(() => {
      result.current.setState((s) => ({
        ...s,
        sortBy: [{ by: "age", direction: "desc" }],
      }));
    });

    await waitFor(() => result.current.updateSortCallback);

    act(() => {
      result.current.updateSortCallback!([{ by: "name", direction: "asc" }], true);
    });

    await waitFor(() => result.current.sortByState?.length === 2);

    expect(result.current.sortByState).toEqual([
      { by: "age", direction: "desc" },
      { by: "name", direction: "asc" },
    ]);
  });

  it("should not call fetchData if new sortBy is empty", async () => {
    const { result: updateSortCallback } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateSort),
      { wrapper }
    );

    await waitFor(() => {
      if (!updateSortCallback.current) throw new Error("updateSort not ready yet");
    });

    const callCountBefore = mockGetList.mock.calls.length;

    act(() => {
      updateSortCallback.current!([]);
    });

    await new Promise((r) => setTimeout(r, 50));

    expect(mockGetList.mock.calls.length).toBe(callCountBefore);
  });

  it("should handle multiple consecutive updates correctly", async () => {
    const { result: updateSortCallback } = renderHook(
      () => useGetPaginatedListState((s) => s?.updateSort),
      { wrapper }
    );

    await waitFor(() => {
      if (!updateSortCallback.current) throw new Error("updateSort not ready yet");
    });

    act(() => {
      updateSortCallback.current!([{ by: "name", direction: "asc" }]);
    });

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledTimes(1);
    });

    act(() => {
      updateSortCallback.current!([{ by: "age", direction: "desc" }], true);
    });

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledTimes(2);
    });

    const lastCallArgs = (mockGetList.mock.calls as any[]).at(-1)?.[0];
    expect(lastCallArgs.sortBy).toEqual([
      { by: "name", direction: "asc" },
      { by: "age", direction: "desc" },
    ]);
  });
});
