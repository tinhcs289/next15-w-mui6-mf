"use client";

import { authLocalStorage } from "@packages/auth";
import { useLayoutEffect } from "react";

export default function AuthChangeHandler() {
  useLayoutEffect(() => {
    const unsubcribe = authLocalStorage.onChange((_oldData, _newData) => {
      if (
        typeof window !== "undefined" &&
        typeof window.location !== "undefined" &&
        typeof window.location.reload === "function"
      ) {
         window.location.reload();
      }
    });

    return unsubcribe;
  }, []);

  return null;
}
