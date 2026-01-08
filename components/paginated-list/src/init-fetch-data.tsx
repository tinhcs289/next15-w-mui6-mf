"use client";

import type { ComponentType, JSX } from "react";
import { memo, useCallback, useEffect } from "react";
import { useGetState, useInitState, useSetState, useCallbackState } from "./context";
import cloneDeep from "./helpers/cloneDeep";
import omit from "./helpers/omit";
import unionBy from "./helpers/unionBy";
import type {
  Any,
  FetchData,
  FetchDataOptions,
  FetchDataPayload,
  GetPaginatedList
} from "./types";

function concatArray<T>(...arrs: T[][]) {
  return arrs.flat();
}

export type FetchDataInitializerProps<
  Item extends Any = Any,
  Filter extends Any = Any,
> = {
  onGetList: GetPaginatedList<Item, Filter>;
  fetchDataOnFirstMount?: boolean;
  infinite?: boolean;
};

export const FetchDataInitializer = memo(
  ({
    onGetList,
    fetchDataOnFirstMount = false,
    infinite = false,
  }: FetchDataInitializerProps) => {
    const setState = useSetState();
    const requestState = useGetState((s) => s?.requestState);
    const pageIndex = useGetState((s) => s.pageIndex);
    const pageSize = useGetState((s) => s.pageSize);
    const sortBy = useGetState((s) => s.sortBy);
    const advanceFilter = useGetState((s) => s?.advanceFilter);
    const defaultFilter = useGetState((s) => s?.defaultFilter);
    const fixedFilter = useGetState((s) => s?.fixedFilter);

    const getQueryArgs = useCallback(
      (
        payload?: FetchDataPayload,
        options?: FetchDataOptions
      ): FetchDataPayload & {
        appliedFilter: FetchDataPayload["advanceFilter"];
      } => {
        const by = options?.by ?? "payload-and-current-states";
        const isOverrided = by === "payload-only";

        const mergedSortBy = isOverrided
          ? (payload?.sortBy ?? [])
          : unionBy(concatArray(payload?.sortBy ?? [], sortBy ?? []), "by");

        const mergedAdvanceFilter = isOverrided
          ? { ...payload?.advanceFilter }
          : { ...advanceFilter, ...payload?.advanceFilter };

        const appliedFilter = isOverrided
          ? { ...payload?.advanceFilter, ...fixedFilter }
          : {
              ...defaultFilter,
              ...advanceFilter,
              ...payload?.advanceFilter,
              ...fixedFilter,
            };

        const args: FetchDataPayload & {
          appliedFilter: FetchDataPayload["advanceFilter"];
        } = {
          pageIndex: isOverrided
            ? (payload?.pageIndex ?? 1)
            : (payload?.pageIndex ?? pageIndex),
          pageSize: isOverrided
            ? payload?.pageSize
            : (payload?.pageSize ?? pageSize),
          sortBy: mergedSortBy,
          advanceFilter: mergedAdvanceFilter,
          appliedFilter,
        };

        return args;
      },
      [pageIndex, pageSize, sortBy, advanceFilter, fixedFilter, defaultFilter]
    );

    const fetchData: FetchData = useCallback(
      (payload, options) => {
        if (!onGetList) return;
        if (requestState === "fetching") return;
        let [result, totalCount]: [Any[], number] = [[], 0];
        const queryArgs = getQueryArgs(payload, options);

        Promise.resolve().then(() => {
          setState((states) => ({
            ...states,
            pageIndex: queryArgs.pageIndex,
            pageSize: queryArgs.pageSize,
            sortBy: queryArgs.sortBy,
            advanceFilter: {
              ...states?.advanceFilter,
              ...payload?.advanceFilter,
            },
          }));
        });

        const getListArgs = omit(cloneDeep(queryArgs), "appliedFilter");
        getListArgs.advanceFilter = queryArgs.appliedFilter;

        onGetList(queryArgs)
          .then((res) => {
            result = Array.isArray(res?.result) ? res.result : [];
            totalCount = Number.isInteger(res?.totalCount) ? res.totalCount : 0;
            setState((states) => ({
              ...states,
              itemsInPage: result,
              ...(infinite
                ? {
                    items: concatArray(states?.items || [], result),
                  }
                : {}),
              totalCount: totalCount,
              requestState: "success",
            }));
          })
          .catch((error) => {
            console.log(error);
            setState({ requestState: "fail" });
          })
          .finally(() => {
            setState({ requestState: "none" });
          });
      },
      [requestState, infinite, onGetList, getQueryArgs, setState]
    );

    useInitState("fetchData", fetchData, {
      when: "whenever-value-changes",
    });

    const refresh = useCallback(() => {
      fetchData?.({}, { by: "payload-and-current-states" });
    }, [fetchData]);

    useInitState("refresh", refresh, {
      when: "whenever-value-changes",
    });

    const initialized = useGetState((s) => s?.initialized);

    useEffect(() => {
      if (!fetchDataOnFirstMount) return;
      if (initialized?.request) return;
      if (!initialized?.states) return;

      setState((states) => ({
        ...states,
        initialized: { ...states?.initialized, request: true },
      }));

      const fetchOnMount = () => {
        fetchData();
      };

      fetchOnMount();
    }, [fetchDataOnFirstMount, initialized]);

    return null;
  }
) as <Item extends Any = Any, Filter extends Any = Any>(
  props: FetchDataInitializerProps<Item, Filter>
) => JSX.Element;
(FetchDataInitializer as ComponentType).displayName = "FetchDataInitializer";
