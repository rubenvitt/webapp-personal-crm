import {
  GetAccessToken,
  GetSession,
  HandleAuth,
  HandleCallback,
  HandleLogin,
  HandleLogout,
  HandleProfile,
  initAuth0,
  WithApiAuthRequired,
  WithPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { getLoginUrl } from "@auth0/nextjs-auth0/dist/config";
import { withPageAuthRequiredFactory } from "@auth0/nextjs-auth0/dist/helpers";
import { SignInWithAuth0 } from "@auth0/nextjs-auth0/dist/instance";
import { ManagementClient } from "auth0";

export const getBaseUrl = (): string => {
  switch (process.env.VERCEL_ENV) {
    case "production":
      return "https://crm.rubeen.dev";
    default:
      return (
        (process.env.NEXT_PUBLIC_VERCEL_URL &&
          "https://" + process.env.NEXT_PUBLIC_VERCEL_URL) ||
        process.env.AUTH0_BASE_URL ||
        "http://localhost:" + (process.env.PORT ?? "3003")
      );
  }
};

let instance: SignInWithAuth0;

function getInstance(): SignInWithAuth0 {
  if (instance) {
    return instance;
  }
  instance = initAuth0({
    baseURL: getBaseUrl(),
  });
  return instance;
}

export const getSession: GetSession = (...args) =>
  getInstance().getSession(...args);

export const getAccessToken: GetAccessToken = (...args) =>
  getInstance().getAccessToken(...args);
export const withApiAuthRequired: WithApiAuthRequired = (...args) =>
  getInstance().withApiAuthRequired(...args);
export const withPageAuthRequired: WithPageAuthRequired =
  withPageAuthRequiredFactory(getLoginUrl(), getSession);
export const handleLogin: HandleLogin = (...args) =>
  getInstance().handleLogin(...args);
export const handleLogout: HandleLogout = (...args) =>
  getInstance().handleLogout(...args);
export const handleCallback: HandleCallback = (...args) =>
  getInstance().handleCallback(...args);
export const handleProfile: HandleProfile = (...args) =>
  getInstance().handleProfile(...args);
export const handleAuth: HandleAuth = (...args) =>
  getInstance().handleAuth(...args);

export const managementClient = new ManagementClient({
  domain: process.env.API_AUTH0_CLIENT_DOMAIN,
  clientId: process.env.API_AUTH0_CLIENT_ID,
  clientSecret: process.env.API_AUTH0_CLIENT_SECRET,
  scope: "read:users update:users",
});
