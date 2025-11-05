"use client";

import { useGetAuthState } from "@shared/auth";
import { Fragment, useEffect, useState } from "react";
import type { AuthGuardClientSideProps } from "./types";

/**
 * Wrap your components inside AuthGuard for authentication protected.
 * @example
  <AuthGuardClientSide WhenUnauthenticated={LoginButton}>
    <UserAvatar>
  </AuthGuardClientSide>
 */
export default function AuthGuardClientSide({
  children,
  WhenUnauthenticated = Fragment,
}: AuthGuardClientSideProps) {
  const [shouldShow, setShouldShow] = useState(false);

  const accessToken = useGetAuthState((s) => s?.auth?.accessToken);

  useEffect(() => {
    // TODO: should implment more to verify auth info
    if (!accessToken) {
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }
  }, [accessToken]);

  if (!shouldShow) {
    return <WhenUnauthenticated />;
  } else {
    return children;
  }
}
