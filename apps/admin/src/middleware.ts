import withLocale from "@/middlewares/withLocale";
import withXUrl from "@/middlewares/withXUrl";
import { stackNextMiddleware } from "@shared/utils-react/next-middleware";

export default stackNextMiddleware([withXUrl, withLocale]);

export const config = {
  matcher: ["/((?!api|assets|_next/static|_next/image|favicon.ico).*)"],
};