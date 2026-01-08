import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StatesProvider, useGetState, useSetState } from "./context";
import { ReactQueryInitializer } from "./init-react-query";

const mockQueryFn = vi.fn();
const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <StatesProvider>
      <ReactQueryInitializer queryKey="test" queryFn={mockQueryFn} />
      {children}
    </StatesProvider>
  </QueryClientProvider>
);

describe("ReactQueryInitializer", () => {
  beforeEach(() => {
    mockQueryFn.mockResolvedValue({ result: [], totalCount: 0 });
  });

  it("should register 'fetchData' and 'refresh' in global state", async () => {
    const { result } = renderHook(
      () => ({
        fetchData: useGetState((s) => s?.fetchData),
        refresh: useGetState((s) => s?.refresh),
      }),
      { wrapper }
    );

    await waitFor(() => result.current);

    expect(result.current.fetchData).toBeTypeOf("function");
    expect(result.current.refresh).toBeTypeOf("function");
  });

  it("should call 'queryFn' when 'fetchData' is invoked", async () => {
    const { result } = renderHook(
      () => ({
        fetchData: useGetState((s) => s?.fetchData),
        pageIndex: useGetState((s) => s?.pageIndex),
        pageSize: useGetState((s) => s?.pageSize),
        sortBy: useGetState((s) => s?.sortBy),
        advanceFilter: useGetState((s) => s?.advanceFilter),
      }),
      { wrapper }
    );

    await waitFor(() => result.current);
    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(1);
    });

    act(() =>
      result.current.fetchData!({
        pageIndex: 2,
        pageSize: 100,
        sortBy: [{ by: "name", direction: "asc" }],
        advanceFilter: { name: "abc" },
      })
    );

    expect(result.current.pageIndex).toBe(2);
    expect(result.current.pageSize).toBe(100);
    expect(result.current.sortBy).toStrictEqual([{ by: "name", direction: "asc" }]);
    expect(result.current.advanceFilter).toStrictEqual({ name: "abc" });

    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(2);
    });

    const calledArgs = mockQueryFn.mock.calls[1][0];
    expect(calledArgs.pageIndex).toBe(2);
    expect(calledArgs.pageSize).toBe(100);
    expect(calledArgs.sortBy).toStrictEqual([{ by: "name", direction: "asc" }]);
    expect(calledArgs.advanceFilter).toStrictEqual({ name: "abc" });
  });

  it("should merge sortBy and advanceFilter correctly", async () => {
    const { result } = renderHook(
      () => ({
        setState: useSetState(),
        fetchData: useGetState((s) => s?.fetchData),
      }),
      { wrapper }
    );

    await waitFor(() => result.current);
    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(1);
    });

    act(() => {
      result.current.setState({
        sortBy: [{ by: "age", direction: "desc" }],
        advanceFilter: { q: "John" },
      });
    });

    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(2);
    });

    const calledArgs1 = mockQueryFn.mock.calls[1][0];

    expect(calledArgs1.sortBy).toStrictEqual([{ by: "age", direction: "desc" }]);
    expect(calledArgs1.advanceFilter).toStrictEqual({ q: "John" });

    act(() =>
      result.current.fetchData!({
        sortBy: [{ by: "name", direction: "asc" }],
        advanceFilter: { active: true },
      })
    );

    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(3);
    });

    const calledArgs2 = mockQueryFn.mock.calls[2][0];

    expect(calledArgs2.sortBy).toEqual([
      { by: "name", direction: "asc" },
      { by: "age", direction: "desc" },
    ]);
    expect(calledArgs2.advanceFilter).toEqual({
      q: "John",
      active: true,
    });
  });

  it("should append items in infinite mode", async () => {
    let callCount = 0;
    mockQueryFn.mockImplementation(() => {
      callCount += 1;
      return Promise.resolve({
        result: [{ id: callCount, name: String(callCount) }],
        totalCount: callCount,
      });
    });

    const wrapperInfinite = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <StatesProvider>
          <ReactQueryInitializer
            queryKey="test"
            queryFn={mockQueryFn}
            infinite
          />
          {children}
        </StatesProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(
      () => ({
        fetchData: useGetState((s) => s?.fetchData),
        items: useGetState((s) => s?.items),
      }),
      { wrapper: wrapperInfinite }
    );

    await waitFor(() => result.current);
    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(1);
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items!.map((i) => i.id)).toEqual([1]);
    });

    act(() => {
      result.current.fetchData!({ pageIndex: 2 });
    });

    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(2);
      expect(result.current.items).toHaveLength(2);
      expect(result.current.items!.map((i) => i.id)).toEqual([1, 2]);
    });

    act(() => {
      result.current.fetchData!({ pageIndex: 3 });
    });

    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(3);
      expect(result.current.items).toHaveLength(3);
      expect(result.current.items!.map((i) => i.id)).toEqual([1, 2, 3]);
    });
  });

  it("should handle manualFirstLoad correctly", async () => {
    const wrapperManualFirstLoad = ({
      children,
    }: {
      children: React.ReactNode;
    }) => (
      <QueryClientProvider client={queryClient}>
        <StatesProvider>
          <ReactQueryInitializer
            queryKey="test"
            queryFn={mockQueryFn}
            manualFirstLoad
          />
          {children}
        </StatesProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(
      () => ({
        items: useGetState((s) => s?.itemsInPage),
        requestState: useGetState((s) => s?.requestState),
      }),
      { wrapper: wrapperManualFirstLoad }
    );

    await waitFor(() => {
      expect(result.current.items).toEqual([]);
      expect(result.current.requestState).toBe("success");
    });
  });
});
