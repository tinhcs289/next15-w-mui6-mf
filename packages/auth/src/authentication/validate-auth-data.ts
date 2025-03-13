import matchesSchema from "@shared/utils/data-validate/matchesSchema";
import type { AuthPlainData } from "../types";
import { authDataSchema } from "./auth-data-schema";

export const validateAuthData = (value?: AuthPlainData | null) => matchesSchema(value, authDataSchema);