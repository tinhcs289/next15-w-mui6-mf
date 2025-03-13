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
        boxShadow="var(--template-shadows-10)"
        borderRadius="4px"
      >
        <TableShopeeProduct />
      </AdminPageBody>
    </ShopeeProductListProvider>
  );
}
