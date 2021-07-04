import { initAuth0 } from "@auth0/nextjs-auth0";
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
        "http://localhost:" + (process.env.PORT ?? "3000")
      );
  }
};

export default initAuth0({
  baseURL: getBaseUrl(),
  authorizationParams: {
    audience: "https://r-personal-crm.eu.auth0.com/api/v2/",
    scope:
      "openid profile read:current_user update:current_user_metadata read:users",
  },
});

export const managementClient = new ManagementClient({
  domain: process.env.API_AUTH0_CLIENT_DOMAIN,
  clientId: process.env.API_AUTH0_CLIENT_ID,
  clientSecret: process.env.API_AUTH0_CLIENT_SECRET,
  scope: "read:users update:users",
});
