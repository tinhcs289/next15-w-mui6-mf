import type { ComponentType, ReactNode } from "react";

export type AuthGuardClientSideProps = {
  children?: ReactNode;
  /**
   * replacement Component should be rendered if unauthenticated
   * @default null
   */
  WhenUnauthenticated?: ComponentType<any>;
};
