"use client";

import unionBy from "lodash/unionBy";
import type { JSX } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import type { QueryObserverOptions } from "react-query";
import { useQuery } from "react-query";
import { useGetState, useInitState, useSetState } from "./context";
import type {
  Any,
  FetchData,
  FetchDataOptions,
  FetchDataPayload,
  GetPaginatedList,
  GetPaginatedListReturns,
  SortOperator,
} from "./types";

function concatArray<T>(...arrs: T[][]) {
  let result = [] as T[];
  arrs.forEach((a) => {
    result = result.concat(a);
  });

  return result;
};

export type ReactQueryInitializerProps<
  Item extends Any = Any,
  Filter extends Any = Any,
> = {
  queryKey: string;
  queryFn: GetPaginatedList<Item, Filter>;
  fetchDataOnFirstMount?: boolean;
  infinite?: boolean;
  queryOptions?: Partial<QueryObserverOptions<GetPaginatedListReturns<Item>>>;
};

export const ReactQueryInitializer = memo(
  ({
    queryKey,
    queryFn,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    infinite = false,
    fetchDataOnFirstMount = true,
    queryOptions,
  }: ReactQueryInitializerProps) => {
    const setState = useSetState();
    const pageIndex = useGetState((s) => s.pageIndex);
    const pageSize = useGetState((s) => s.pageSize);
    const sortBy = useGetState((s) => s.sortBy);
    const advanceFilter = useGetState((s) => s?.advanceFilter);
    const defaultFilter = useGetState((s) => s?.defaultFilter);
    const fixedFilter = useGetState((s) => s?.fixedFilter);
    const initialized = useGetState((s) => s?.initialized);

    const { data, isSuccess, isLoading, isError, isFetching, isFetched } =
      useQuery({
        queryKey: [
          queryKey as string,
          pageIndex,
          pageSize,
          sortBy,
          advanceFilter,
        ],
        queryFn: () =>
          queryFn({
            pageIndex,
            pageSize,
            sortBy,
            advanceFilter,
          }),
        enabled: fetchDataOnFirstMount,
        ...queryOptions,
      });

    useEffect(() => {
      if (initialized?.request) return;
      if (!isFetched) return;
      if (!isSuccess) return;
      setState((states) => ({
        ...states,
        initialized: { ...states?.initialized, request: true },
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized, isFetched, isSuccess]);

    const totalCount = useMemo(() => data?.totalCount || 0, [data?.totalCount]);
    useInitState("totalCount", totalCount, { when: "whenever-value-changes" });

    const result = useMemo(() => data?.result || [], [data?.result]);
    useInitState("itemsInPage", result, { when: "whenever-value-changes" });

    useEffect(() => {
      if (!result?.length) return;
      if (!infinite) {
        setState({ items: result });
      } else {
        setState((states) => ({
          ...states,
          items: concatArray(states?.items || [], result),
        }));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infinite, result]);

    useEffect(() => {
      if (!isError) return;
      setState({ requestState: "fail" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);

    useEffect(() => {
      if (!isLoading) return;
      if (!isFetching) return;
      setState({ requestState: "fetching" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching]);

    useEffect(() => {
      if (!isSuccess) return;
      if (!isFetched) return;
      setState({ requestState: "success" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isFetched]);

    const getQueryArgs = useCallback(
      (
        payload?: FetchDataPayload,
        options?: FetchDataOptions
      ): FetchDataPayload => {
        const { by = "payload-and-current-states" } = options || {};
        const isOverrided = by === "payload-only";
        const args: FetchDataPayload = {
          pageIndex: isOverrided
            ? payload?.pageIndex || 1
            : payload?.pageIndex || pageIndex,
          pageSize: isOverrided
            ? payload?.pageSize
            : payload?.pageSize || pageSize,
          sortBy: isOverrided
            ? payload?.sortBy || []
            : unionBy(
                concatArray<SortOperator>(payload?.sortBy || [], sortBy || []),
                (s) => s.by
              ),
          advanceFilter: !isOverrided
            ? {
                ...defaultFilter,
                ...advanceFilter,
                ...payload?.advanceFilter,
                ...fixedFilter,
              }
            : {
                ...payload?.advanceFilter,
                ...fixedFilter,
              },
        };
        return args;
      },
      [pageIndex, pageSize, sortBy, advanceFilter, fixedFilter, defaultFilter]
    );

    const fetchData: FetchData = useCallback(
      (payload, options) => {
        const args = getQueryArgs(payload, options);
        setState((states) => ({
          ...states,
          pageIndex: args.pageIndex,
          pageSize: args.pageSize,
          sortBy: args.sortBy,
          advanceFilter: args.advanceFilter,
        }));
      },
      [getQueryArgs, setState]
    );

    useInitState("fetchData", fetchData, {
      when: "whenever-value-changes",
    });

    return null;
  }
) as <Item extends Any = Any, Filter extends Any = Any>(
  props: ReactQueryInitializerProps<Item, Filter>
) => JSX.Element;
// @ts-ignore
ReactQueryInitializer.displayName = "ReactQueryInitializer";