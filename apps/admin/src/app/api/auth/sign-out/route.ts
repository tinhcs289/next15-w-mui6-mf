import { ENV_CONFIG } from "@/constants/environment";
import { cookies } from "next/headers";

export async function DELETE() {
  const cookieStore = await cookies();

  const access_token =  cookieStore.get("access_token")?.value;
  if (access_token) {
    try {
      await fetch(`${ENV_CONFIG.internalRestApiBaseUrl}/sso/signout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch {
      // Ignore errors
    }
  }

  return new Response("Signed out", {
    status: 200,
    headers: {
      "Set-Cookie": [
        `access_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`,
        `refresh_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`,
      ].join(", "),
    },
  });
}
