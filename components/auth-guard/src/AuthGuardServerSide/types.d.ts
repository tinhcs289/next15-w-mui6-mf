import type { ComponentType, ReactNode } from "react";

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
  fallback?: ComponentType<any>;
};
