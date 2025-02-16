import { AdminLayout } from "./component-root";
import AdminPageBody from "./components/AdminPageBody";

export default AdminLayout;

export { AdminPageBody };

export {
  useDefineAdminLayoutMethod,
  useGetAdminLayoutState,
  useInitAdminLayoutState,
  useSetAdminLayoutState,
} from "./context";

export type { AdminLayoutProps, AdminLayoutStates } from "./types";
