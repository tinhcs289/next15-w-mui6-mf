import { JwtPayload } from "jsonwebtoken";

export type AuthTokenPayload = JwtPayload & {
  user_id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  preference_language?: string;
  avatar?: string;
};
