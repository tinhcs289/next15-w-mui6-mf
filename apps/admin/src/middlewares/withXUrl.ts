import { ALL_LOCALE } from "@repo/constants/locale";
import type { NextMiddlewareFactory } from "@repo/utils-react/next-middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const {
  NEXT_PUBLIC_APP_MAIN_URL: APP_MAIN_URL,
  NEXT_PUBLIC_ZONE_NAME: ZONE_NAME
} = process.env;

const localePaths = ALL_LOCALE.map(l => `/${l}`);

const X_URL = "x-url";
const X_URL_ORG = "x-url-origin"

const withXUrl: NextMiddlewareFactory = (nextMiddleware) => {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    if (!request.url.includes("/_next/")) {
      request.headers.set(X_URL_ORG, request.url);

      const pathname = request.nextUrl.pathname;
      const localePath = localePaths.find(p => pathname.startsWith(p));
      if (!localePath) {
        const rewritedUrl = `${APP_MAIN_URL}/${ZONE_NAME}${request.nextUrl.pathname}`;
        request.headers.set(X_URL, rewritedUrl);
      } else {
        const pathNameWithoutlocale = `${pathname}`.replace(localePath, "");
        const rewritedUrl = `${APP_MAIN_URL}${localePath}/${ZONE_NAME}${pathNameWithoutlocale}`;
        request.headers.set(X_URL, rewritedUrl);
      }
    }
    return nextMiddleware(request, event, response);
  };
};
export default withXUrl;