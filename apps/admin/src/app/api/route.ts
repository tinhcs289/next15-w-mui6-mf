import { ENV_CONFIG } from "@/constants/environment";

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors 
 */
export async function GET(_: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': `${ENV_CONFIG.applicationDomain}`,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}