import { ENV_CONFIG } from "@/constants/environment";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  const refresh_token = cookieStore.get("refresh_token")?.value;

  if (!refresh_token?.trim?.()) {
    return new Response("No refresh token", {
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
      `${ENV_CONFIG.internalRestApiBaseUrl}/sso/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token }),
      }
    );

    if (!res.ok) throw res;

    const tokens = await res.json();
    const { access_token, refresh_token: new_refresh_token } = tokens.data;

    return new Response("Token refreshed", {
      status: 200,
      headers: {
        "Set-Cookie": [
          `access_token=${access_token}; HttpOnly; Path=/; SameSite=Strict`,
          `refresh_token=${new_refresh_token}; HttpOnly; Path=/; SameSite=Strict`,
        ].join(", "),
      },
    });
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
