import { ENV_CONFIG } from "@/constants/environment";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username?.trim?.() || !password?.trim?.()) {
      return new Response("Invalid credentials", { status: 400 });
    }

    const res = await fetch(
      `${ENV_CONFIG.internalRestApiBaseUrl}/sso/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!res.ok) throw res;

    const tokens = await res.json();
    const { access_token, refresh_token } = tokens.data;

    return new Response("Signed in", {
      status: 200,
      headers: {
        "Set-Cookie": [
          `access_token=${access_token}; HttpOnly; Path=/; SameSite=Strict`,
          `refresh_token=${refresh_token}; HttpOnly; Path=/; SameSite=Strict`,
        ].join(", "),
      },
    });
  } catch {
    return new Response("Sign in failed", { status: 500 });
  }
}
