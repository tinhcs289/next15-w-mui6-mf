"use client";

import type { JSX } from "react";
import { memo, useCallback } from "react";
import type { DialogStates, Any } from "../types";
import { useInitStateDialog } from "./context";

export const DialogOnCloseInitializer = memo(
  ({ callback }: { callback?: DialogStates["closeDialog"] }) => {
    const handleOnClose: Required<DialogStates>["closeDialog"] = useCallback(
      ({ reason, data }) => {
        callback?.({ reason, data });
      },
      [callback]
    );
    useInitStateDialog("closeDialog", handleOnClose, {
      when: "whenever-value-changes",
    });
    return null;
  }
) as <CallbackData extends Any = Any>(props: {
  callback?: DialogStates<CallbackData>["closeDialog"];
}) => JSX.Element;

// @ts-ignore
DialogOnCloseInitializer.displayName = "DialogOnCloseInitializer";
