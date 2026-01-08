import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { StatesProvider, createStateHooks } from "./context";
import { FetchDataInitializer } from "./init-fetch-data";
import { UpdatePagingInitializer } from "./init-paging";
import { ListStatesInitializer } from "./init-states";

const { useGetPaginatedListState } = createStateHooks();

const mockGetList = vi.fn(async (_payload: any) => ({
  result: [],
  totalCount: 0,
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <StatesProvider>
    <ListStatesInitializer pageSize={10} />
    <FetchDataInitializer onGetList={mockGetList} />
    <UpdatePagingInitializer />
    {children}
  </StatesProvider>
);

describe("UpdatePagingInitializer", () => {
  it("should register updatePaging function in state", async () => {
    const { result: updatePagingCallback } = renderHook(
      () => useGetPaginatedListState((s) => s?.updatePaging),
      { wrapper }
    );

    await waitFor(() => {
      expect(updatePagingCallback.current).toBeTypeOf("function");
    });
  });

  it("should call fetchData with new page index and current page size when call updatePaging with undefined page size", async () => {
    const { result } = renderHook(
      () => {
        const updatePagingCallback = useGetPaginatedListState(
          (s) => s?.updatePaging
        );
        const pageSizeState = useGetPaginatedListState((s) => s?.pageSize);

        return {
          updatePagingCallback,
          pageSizeState,
        };
      },
      { wrapper }
    );

    await waitFor(() => {
      if (!result.current?.updatePagingCallback)
        throw new Error("updatePaging not ready yet");
    });

    expect(result.current.pageSizeState).toBe(10);

    act(() => {
      result.current.updatePagingCallback!(2);
    });

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledTimes(1);
    });

    const lastCallArgs = (mockGetList.mock.calls as any[]).at(-1)[0];
    expect(lastCallArgs.pageIndex).toBe(2);
    expect(lastCallArgs.pageSize).toBe(10);
  });

  it("should call fetchData with new page index and new page size when call updatePaging", async () => {
    const { result } = renderHook(
      () => {
        const updatePagingCallback = useGetPaginatedListState(
          (s) => s?.updatePaging
        );
        const pageSizeState = useGetPaginatedListState((s) => s?.pageSize);

        return {
          updatePagingCallback,
          pageSizeState,
        };
      },
      { wrapper }
    );

    await waitFor(() => {
      if (!result.current?.updatePagingCallback)
        throw new Error("updatePaging not ready yet");
    });

    expect(result.current.pageSizeState).toBe(10);

    act(() => {
      result.current.updatePagingCallback!(2, 20);
    });

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledTimes(1);
    });

    const lastCallArgs = (mockGetList.mock.calls as any[]).at(-1)[0];
    expect(lastCallArgs.pageIndex).toBe(2);
    expect(lastCallArgs.pageSize).toBe(20);
  });
});
