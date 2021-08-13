import { loadEnvironmentVar } from "./utils";

export const URL_APP =
  loadEnvironmentVar("NEXT_PUBLIC_VERCEL_URL") ??
  "http://localhost:" + (loadEnvironmentVar("PORT") || 3000);

export const URL_API_Persons = "/persons";
export const URL_API_Auth = "/api/auth";
export const URL_API_Auth_Login = URL_API_Auth + "/login";
export const URL_API_Auth_Logout = URL_API_Auth + "/logout";
