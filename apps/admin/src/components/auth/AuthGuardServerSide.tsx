"use server";

import useAuthCookieServerSide from "@/hooks/common/useAuthCookieServerSide";
import useBuildReturnUrlServerSide from "@/hooks/common/useBuildReturnUrlServerSide";
import { redirect } from "@/i18n/navigation";
import { AuthStoreProvider } from "@repo/share-react/auth";
import { getLocale } from 'next-intl/server';
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
  const authData = await useAuthCookieServerSide();
  const isAuthenticated = !!authData;

  const redirectUrlWithReturnUri = await useBuildReturnUrlServerSide(
    redirectUrl
  );

  const locale = await getLocale();

  if (!isAuthenticated && !!redirectUrlWithReturnUri) {
    redirect({ href: redirectUrlWithReturnUri, locale });
  }

  if (!isAuthenticated) {
    return <WhenUnauthenticated />;
  }

  return <AuthStoreProvider>{children}</AuthStoreProvider>;
}