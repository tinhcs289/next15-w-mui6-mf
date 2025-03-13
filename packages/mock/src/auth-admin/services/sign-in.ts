import type { AuthData } from "@shared/auth";
import { decodeAuthData } from "@shared/auth";
import wait from "@shared/utils/async/wait";

const mockJWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6IjRiMjA0YjBkLWEwZGUtNDM2Ni04MWI3LTFmOGM1ODkzYmUwYiIsInVzZXJuYW1lIjoidGluaGNzIiwiZmlyc3RfbmFtZSI6IlRpbmgiLCJsYXN0X25hbWUiOiJDYW8iLCJwcmVmZXJlbmNlX2xhbmd1YWdlIjoidmkiLCJhdmF0YXIiOiJodHRwczovL2dvbGl2ZXMzLnMzLmFtYXpvbmF3cy5jb20vMjAyMi8wOS80OTE1XzQxM2E5NjY1YzJmMjhjZmVlZWI3ZGFhMzEzZjA5OTMwLnBuZyIsInJlZnJlc2hfdG9rZW4iOiIyMmIzYjg1MC03NDQ0LTRlMjItODQ0OS1lMTk5ZjY0ODkwMWIiLCJleHAiOjI4ODAwLCJpYXQiOjE1MTYyMzkwMjJ9.RAFIv95JCd_m1zaTgj4nE-gpMQ-JUIdX9y-g64UhhuM";


export const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<AuthData | null> => {
  await wait(1000);
  const auth = decodeAuthData(mockJWT);
  return auth;
};
