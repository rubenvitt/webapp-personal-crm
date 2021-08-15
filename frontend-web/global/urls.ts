import { apiNode, publicVercel } from "./constants";

export const URL_APP =
  publicVercel.url ?? "http://localhost:" + (apiNode.port || 3000);

export const URL_API_Persons = "/persons";
export const URL_API_Auth = "/api/auth";
export const URL_API_Auth_Login = URL_API_Auth + "/login";
export const URL_API_Auth_Logout = URL_API_Auth + "/logout";
