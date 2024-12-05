import withLocale from "@/middlewares/withLocale";
import { stackNextMiddleware, withXUrl } from "@repo/share-react/utils/next-middleware";

export default stackNextMiddleware([withXUrl, withLocale]);

export const config = {
  matcher: ["/((?!api|assets|_next/static|_next/image|favicon.ico).*)"],
};