import { authDataSchema } from "@shared/constants/auth";
import type { AuthData } from "@shared/types/auth";
import matchesSchema from "@shared/utils/data-validate/matchesSchema";

export const validateAuthData = (value?: AuthData | null) => matchesSchema(value, authDataSchema);