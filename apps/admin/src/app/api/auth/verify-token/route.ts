import { ENV_CONFIG } from "@/constants/environment";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const access_token = cookieStore.get("access_token")?.value;

  if (!access_token?.trim?.()) {
    return new Response("No access token", {
      status: 500,
      headers: {
        "Set-Cookie": [
          `access_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`,
          `refresh_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`,
        ].join(", "),
      },
    });
  }

  try {
    const res = await fetch(
      `${ENV_CONFIG.internalRestApiBaseUrl}/sso/verify-token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!res.ok) throw res;
    return new Response("Token is valid", { status: 200 });
  } catch {
    return new Response("Token refresh failed", {
      status: 500,
      headers: {
        "Set-Cookie": [
          `access_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`,
          `refresh_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`,
        ].join(", "),
      },
    });
  }
}
