import type { NextMiddlewareFactory } from "@shared/utils-react/next-middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const withXUrl: NextMiddlewareFactory = (nextMiddleware) => {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    if (!request.url.includes("/_next/")) {
      request.headers.set("x-url", request.url);
    }
    return nextMiddleware(request, event, response);
  };
};
export default withXUrl;