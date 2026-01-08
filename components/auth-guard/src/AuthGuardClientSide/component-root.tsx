"use client";

import { useGetAuthState } from "@packages/auth";
import { Fragment, Suspense, useEffect, useState } from "react";
import type { AuthGuardClientSideProps } from "./types";


const verifyToken = async (_accessToken: string) =>(new Promise<boolean>((resolve) => {
  // TODO: should implement more to verify auth info
  setTimeout(() => { resolve(true) }, 300);
}))

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
  const accessToken = useGetAuthState((s) => s?.auth?.accessToken);
  const [isVerified, setVerified] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      return setVerified(false);
    } else {
      verifyToken(accessToken)
      .then((isValid) => {
        setVerified(isValid);
      }).catch(() => {
         setVerified(false);
      });
    }
  }, [accessToken]);

  return (
    !isVerified ? <WhenUnauthenticated /> : <Suspense>{children}</Suspense>
  );
}
