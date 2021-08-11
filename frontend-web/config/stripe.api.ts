import { loadEnvironmentVar } from "../global/utils";

export const SECRET_KEY = loadEnvironmentVar("STRIPE_SK", true);
