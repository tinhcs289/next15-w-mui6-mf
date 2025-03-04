"use client";

import type { Any, FetchDataOptions, FetchDataPayload, FetchData, GetPaginatedList, SortOperator } from "./types";
import type { JSX} from "react";
import { memo, useCallback, useEffect } from "react";
import unionBy from "lodash/unionBy";
import cloneDeep from "lodash/cloneDeep";
import omit from "lodash/omit";
import { useGetState, useSetState, useInitState } from "./context";

function concatArray<T>(...arrs: T[][]) {
  let result = [] as T[];
  arrs.forEach((a) => {
    result = result.concat(a);
  });

  return result;
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
        const { by = "payload-and-current-states" } = options || {};
        const isOverrided = by === "payload-only";

        const args: FetchDataPayload & {
          appliedFilter: FetchDataPayload["advanceFilter"];
        } = {
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
                ...advanceFilter,
                ...payload?.advanceFilter,
              }
            : {
                ...payload?.advanceFilter,
              },
          appliedFilter: !isOverrided
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
        if (!onGetList) return;
        if (requestState === "fetching") return;
        let [result, totalCount]: [Any[], number] = [[], 0];
        const queryArgs = getQueryArgs(payload, options);

        setTimeout(() => {
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
        }, 0);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDataOnFirstMount, initialized]);

    return null;
  }
) as <Item extends Any = Any, Filter extends Any = Any>(
  props: FetchDataInitializerProps<Item, Filter>
) => JSX.Element;
// @ts-ignore
FetchDataInitializer.displayName = "FetchDataInitializer";