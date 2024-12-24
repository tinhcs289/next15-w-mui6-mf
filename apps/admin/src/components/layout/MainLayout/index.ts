import { default as MainLayout } from "@repo/layouts/AdminLayout";

export default MainLayout;

import {
  useDefineAdminLayoutMethod as useDefineMainLayoutMethod,
  useGetAdminLayoutState as useGetMainLayoutState,
  useInitAdminLayoutState as useInitMainLayoutState,
  useSetAdminLayoutState as useSetMainLayoutState,
} from "@repo/layouts/AdminLayout";

export {
  useDefineMainLayoutMethod,
  useGetMainLayoutState,
  useInitMainLayoutState,
  useSetMainLayoutState,
};

export type {
  AdminLayoutProps as MainLayoutProps,
  AdminLayoutStates as MainLayoutStates,
} from "@repo/layouts/AdminLayout";


