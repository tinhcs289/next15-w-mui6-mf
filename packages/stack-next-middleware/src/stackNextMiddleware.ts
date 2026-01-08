import type { NextMiddlewareResult } from "next/dist/server/web/types";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type NextMiddlewareFactory = (
  middleware: CustomMiddleware
) => CustomMiddleware;


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

// export default function stackNextMiddleware(
//   factories: NextMiddlewareFactory[]
// ): CustomMiddleware {
//   return async (req: NextRequest, event: NextFetchEvent, res: NextResponse) => {
//     let index = 0

//     const next = async (): Promise<NextMiddlewareResult> => {
//       if (index >= factories.length) return res
//       const factory = factories[index++]
//       const middleware = factory!(next)
//       return middleware(req, event, res)
//     }

//     return next()
//   }
// }
