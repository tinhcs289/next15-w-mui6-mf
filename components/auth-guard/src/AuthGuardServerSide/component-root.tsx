"use server";

import { AuthStatesProvider } from "@packages/auth";
import { redirect } from "@packages/navigation";
import { createReturnUrlHash, getAuthCookie } from "@packages/server-actions";
import { getLocale } from "next-intl/server";
import AuthChangeHandler from "./AuthChangeHandler";
import type { AuthGuardServerSideProps } from "./types";
import { verifyAuth } from "./verify-auth";

function DefaultFallback() {
  return (
    <div>
      <h1>403</h1>
    </div>
  );
}

/**
 * Wrap your components inside AuthGuard for authentication protected.
 * @example
  some-page/page.tsx

  export default async function SomePage() {
    return (
      <AuthGuardServerSide redirect="/login">
        ....
      </AuthGuardServerSide>
    );
  }
 */
export default async function AuthGuardServerSide({
  children,
  redirect: redirectUrl,
  fallback: Fallback = DefaultFallback,
}: AuthGuardServerSideProps) {
  const authData = await getAuthCookie();
  const isAuthenticated = await verifyAuth(authData);
  const redirectUrlWithReturnUri = await createReturnUrlHash(redirectUrl);
  const locale = await getLocale();


  if (!isAuthenticated) {
    if (redirectUrlWithReturnUri) {
      redirect({ href: redirectUrlWithReturnUri, locale });
    } else {
      return <Fallback />;
    }
  }

  return (
    <AuthStatesProvider>
      {children}
      <AuthChangeHandler />
    </AuthStatesProvider>
  );
}
