import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { CustomMiddleware, NextMiddlewareFactory } from "./types";

export default function stackNextMiddleware(
  functions: NextMiddlewareFactory[],
  index = 0
): CustomMiddleware {
  const current = functions[index]

  if (current) {
    const next = stackNextMiddleware(functions, index + 1)
    return current(next)
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    return response
  }
}