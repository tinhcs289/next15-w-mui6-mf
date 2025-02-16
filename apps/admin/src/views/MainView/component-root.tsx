import { AdminPageBody } from "@shared/layouts/AdminLayout";
import TableShopeeProduct from "./components/TableShopeeProduct";
import { ShopeeProductListProvider } from "./context";

export default function View() {
  return (
    <ShopeeProductListProvider>
      <AdminPageBody
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <TableShopeeProduct />
      </AdminPageBody>
    </ShopeeProductListProvider>
  );
}
