import withLocale from "@/middlewares/withLocale";
import withXUrl from "@/middlewares/withXUrl";
import { stackNextMiddleware } from "@packages/stack-next-middleware";

const middlewares = stackNextMiddleware([withXUrl, withLocale]);

export default function proxy(...args: any[]) {
  return middlewares(...(args as Parameters<typeof middlewares>));
}

export const config = {
  matcher: ["/((?!api|assets|_next/static|_next/image|favicon.ico).*)"],
};