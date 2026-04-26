"use client";

import { useGetAuthState } from "@packages/auth";
import { Fragment, Suspense, useEffect } from "react";
import type { AuthGuardClientSideProps } from "./types";

const VerifyAuthOnMount

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
  const isVerified = useGetAuthState((s) => Boolean(s?.verifiedAuth));
  const verifyAuth = useGetAuthState((s) => s?.verifyAuth);

  useEffect(() => {
    if (!verifyAuth) return;
    void verifyAuth();
  }, [verifyAuth]);

  return !isVerified ? (
    <Suspense>
      <WhenUnauthenticated />
    </Suspense>
  ) : (
    <Suspense>{children}</Suspense>
  );
}
