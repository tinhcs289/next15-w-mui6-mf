import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStateHooks, StatesProvider } from "./context";
import { FetchDataInitializer } from "./init-fetch-data";
import type { SortOperator } from "./types";

type TestItem = { id: number; name: string };
type TestFilter = { active?: boolean; q?: string };
type TestStates = {
  items?: TestItem[];
  sortBy?: SortOperator[];
  fetchData?: (payload?: any, options?: any) => void;
  requestState?: string;
  advanceFilter?: TestFilter;
  defaultFilter?: TestFilter;
  fixedFilter?: TestFilter;
  totalCount?: number;
};

const { useGetPaginatedListState, useSetPaginatedListState } =
  createStateHooks<TestStates>();

const mockGetList = vi.fn();

const wrapper =
  ({ fetchDataOnFirstMount = false, infinite = false }) =>
  ({ children }: { children: React.ReactNode }) => (
    <StatesProvider>
      <FetchDataInitializer
        onGetList={mockGetList}
        fetchDataOnFirstMount={fetchDataOnFirstMount}
        infinite={infinite}
      />
      {children}
    </StatesProvider>
  );

describe("FetchDataInitializer", () => {
  beforeEach(() => {
    mockGetList.mockResolvedValue({ result: [], totalCount: 0 });
  });

  it("should register fetchData and refresh in global state when initialized", async () => {
    const { result } = renderHook(
      () => ({
        fetchData: useGetPaginatedListState((s) => s?.fetchData),
        refresh: useGetPaginatedListState((s) => s?.refresh),
      }),
      { wrapper: wrapper({}) }
    );

    await waitFor(() => {
      expect(result.current.fetchData).toBeTypeOf("function");
      expect(result.current.refresh).toBeTypeOf("function");
    });
  });

  it("should merge sortBy correctly when using 'payload-and-current-states'", async () => {
    const { result } = renderHook(
      () => {
        const setState = useSetPaginatedListState();
        const fetchData = useGetPaginatedListState((s) => s?.fetchData);
        return { setState, fetchData };
      },
      { wrapper: wrapper({}) }
    );

    act(() => {
      result.current.setState((s) => ({
        ...s,
        sortBy: [{ by: "age", direction: "desc" }],
      }));
    });

    await waitFor(() => result.current.fetchData);

    act(() => {
      result.current.fetchData!(
        { sortBy: [{ by: "name", direction: "asc" }] },
        { by: "payload-and-current-states" }
      );
    });

    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));

    const args = mockGetList.mock.calls.at(0)?.[0];
    expect(args.sortBy).toEqual([
      { by: "name", direction: "asc" },
      { by: "age", direction: "desc" },
    ]);
  });

  it("should override sortBy when using 'payload-only' mode", async () => {
    const { result } = renderHook(
      () => {
        const setState = useSetPaginatedListState();
        const fetchData = useGetPaginatedListState((s) => s?.fetchData);
        return { setState, fetchData };
      },
      { wrapper: wrapper({}) }
    );

    act(() => {
      result.current.setState((s) => ({
        ...s,
        sortBy: [{ by: "age", direction: "desc" }],
      }));
    });

    await waitFor(() => result.current.fetchData);

    act(() => {
      result.current.fetchData!(
        { sortBy: [{ by: "name", direction: "asc" }] },
        { by: "payload-only" }
      );
    });

    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));

    const args = mockGetList.mock.calls.at(0)?.[0];
    expect(args.sortBy).toEqual([{ by: "name", direction: "asc" }]);
  });

  it("should merge all filters correctly when combining payload, default, advance, and fixed filters", async () => {
    const { result } = renderHook(
      () => {
        const setState = useSetPaginatedListState();
        const fetchData = useGetPaginatedListState((s) => s?.fetchData);
        return { setState, fetchData };
      },
      { wrapper: wrapper({}) }
    );

    act(() => {
      result.current.setState((s) => ({
        ...s,
        defaultFilter: { active: true },
        advanceFilter: { q: "John" },
        fixedFilter: { tenant: "x" },
      }));
    });

    await waitFor(() => result.current.fetchData);

    act(() => {
      result.current.fetchData!(
        { advanceFilter: { page: 2 } },
        { by: "payload-and-current-states" }
      );
    });

    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));

    const args = mockGetList.mock.calls.at(0)?.[0];
    expect(args.appliedFilter).toEqual({
      active: true,
      q: "John",
      page: 2,
      tenant: "x",
    });
  });

  it("should call fetchData automatically when fetchDataOnFirstMount is true", async () => {
    const customWrapper = ({ children }: { children: React.ReactNode }) => (
      <StatesProvider>
        <FetchDataInitializer onGetList={mockGetList} fetchDataOnFirstMount />
        {children}
      </StatesProvider>
    );

    const { result: setState } = renderHook(() => useSetPaginatedListState(), {
      wrapper: customWrapper,
    });

    act(() => {
      setState.current((s) => ({
        ...s,
        initialized: { states: true, request: false },
      }));
    });

    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));
  });

  it("should append results when infinite mode is enabled", async () => {
    mockGetList
      .mockResolvedValueOnce({ result: [{ id: 1, name: "A" }], totalCount: 1 })
      .mockResolvedValueOnce({ result: [{ id: 2, name: "B" }], totalCount: 2 });

    const { result } = renderHook(
      () => {
        const setState = useSetPaginatedListState();
        const fetchData = useGetPaginatedListState((s) => s?.fetchData);
        const items = useGetPaginatedListState((s) => s?.items);
        return { setState, fetchData, items };
      },
      { wrapper: wrapper({ infinite: true }) }
    );

    await waitFor(() => result.current.fetchData);

    act(() => {
      result.current.fetchData!();
    });
    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));

    act(() => {
      result.current.fetchData!();
    });

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledTimes(2);
      expect(result.current.items).toHaveLength(2);
    });
  });

  it("should set requestState to 'fail' when onGetList throws an error", async () => {
    mockGetList.mockRejectedValueOnce(new Error("network fail"));

    const { result } = renderHook(
      () => useGetPaginatedListState((s) => s?.fetchData),
      { wrapper: wrapper({}) }
    );

    await waitFor(() => result.current);

    act(() => {
      result.current!();
    });

    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));
  });

  it("should not call onGetList when requestState is 'fetching'", async () => {
    const { result } = renderHook(
      () => {
        const setState = useSetPaginatedListState();
        const fetchData = useGetPaginatedListState((s) => s?.fetchData);
        return { setState, fetchData };
      },
      { wrapper: wrapper({}) }
    );

    act(() => {
      result.current.setState({ requestState: "fetching" });
    });

    await waitFor(() => result.current.fetchData);

    act(() => {
      result.current.fetchData!();
    });

    expect(mockGetList).not.toHaveBeenCalled();
  });

  it("should reset requestState to 'none' after fetchData completes successfully", async () => {
    const { result } = renderHook(
      () => {
        const setState = useSetPaginatedListState();
        const fetchData = useGetPaginatedListState((s) => s?.fetchData);
        const requestState = useGetPaginatedListState((s) => s?.requestState);
        return { setState, fetchData, requestState };
      },
      { wrapper: wrapper({}) }
    );

    await waitFor(() => result.current.fetchData);

    act(() => {
      result.current.fetchData!();
    });

    await waitFor(() => expect(result.current.requestState).toBe("none"));
  });

  it("should call 'fetchData' when 'refresh' is invoked", async () => {
    const { result } = renderHook(
      () => ({
        refresh: useGetPaginatedListState((s) => s?.refresh),
        fetchData: useGetPaginatedListState((s) => s?.fetchData),
        setState: useSetPaginatedListState(),
      }),
      { wrapper: wrapper({}) }
    );

    act(() => {
      result.current.setState({
        sortBy: [{ by: "name", direction: "asc" }],
        advanceFilter: { q: "Alice" },
        pageIndex: 2,
        pageSize: 10,
      });
    });

    await waitFor(() => result.current.refresh);

    act(() => {
      result.current.refresh!();
    });

    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));

    const args = mockGetList.mock.calls.at(0)?.[0];
    expect(args.sortBy).toEqual([{ by: "name", direction: "asc" }]);
    expect(args.advanceFilter).toEqual({ q: "Alice" });
    expect(args.pageIndex).toBe(2);
    expect(args.pageSize).toBe(10);
  });
});
