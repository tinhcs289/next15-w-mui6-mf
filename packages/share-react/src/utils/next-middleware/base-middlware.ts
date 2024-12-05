import type { NextMiddlewareFactory } from "@repo/share-react/utils/next-middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const withXUrl: NextMiddlewareFactory = (nextMiddleware) => {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    request.headers.set("x-url", request.url);
    return nextMiddleware(request, event, response);
  };
};