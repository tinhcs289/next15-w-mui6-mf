"use server";

import { redirect } from "@/i18n/navigation";
import { createReturnUrlHash, getAuthCookie } from "@shared/server-actions";
import { getLocale } from "next-intl/server";
import type { ComponentType, ReactNode } from "react";
import { Fragment } from "react";

export type AuthGuardServerSideProps = {
  children?: ReactNode;
  /**
   * redirect-to url if unauthenticated
   */
  redirect?: string;
  /**
   * replacement Component should be rendered if unauthenticated
   * @default null
   */
  WhenUnauthenticated?: ComponentType<any>;
};

/**
 * Wrap your components inside AuthGuard for authentication protected.
 * @example
  some-page/page.tsx

  export default function SomePage() {
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
  WhenUnauthenticated = Fragment,
}: AuthGuardServerSideProps) {
  const authData = await getAuthCookie();
  const isAuthenticated = !!authData;

  const redirectUrlWithReturnUri = await createReturnUrlHash(redirectUrl);

  const locale = await getLocale();

  if (!isAuthenticated && !!redirectUrlWithReturnUri) {
    redirect({ href: redirectUrlWithReturnUri, locale });
    return <></>;
  }

  if (!isAuthenticated) {
    return <WhenUnauthenticated />;
  }

  return <>{children}</>;
}
