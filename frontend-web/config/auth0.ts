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
import {
  apiAuth0,
  apiAuth0Client,
  apiVercel,
  publicVercel,
} from "../global/constants";
import { UserAppMetadata, UserUserMetadata } from "../global/interfaces";

export const getBaseUrl = (): string => {
  switch (apiVercel.env) {
    case "production":
      return "https://crm.rubeen.dev";
    default:
      return (
        (publicVercel.url && "https://" + publicVercel.url) ||
        apiAuth0.baseUrl ||
        "http://localhost:" + (apiVercel.port ?? "3000")
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

export const managementClient = new ManagementClient<
  UserAppMetadata,
  UserUserMetadata
>({
  domain: apiAuth0Client.domain,
  clientId: apiAuth0Client.id,
  clientSecret: apiAuth0Client.secret,
  scope:
    "read:users update:users create:users_app_metadata delete:users_app_metadata update:users_app_metadata read:users_app_metadata",
});
