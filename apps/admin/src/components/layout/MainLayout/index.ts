import { default as MainLayout } from "@shared/layouts/AdminLayout";

export default MainLayout;

import {
  useDefineAdminLayoutMethod as useDefineMainLayoutMethod,
  useGetAdminLayoutState as useGetMainLayoutState,
  useInitAdminLayoutState as useInitMainLayoutState,
  useSetAdminLayoutState as useSetMainLayoutState,
} from "@shared/layouts/AdminLayout";

export {
  useDefineMainLayoutMethod,
  useGetMainLayoutState,
  useInitMainLayoutState,
  useSetMainLayoutState,
};

export type {
  AdminLayoutProps as MainLayoutProps,
  AdminLayoutStates as MainLayoutStates,
} from "@shared/layouts/AdminLayout";


