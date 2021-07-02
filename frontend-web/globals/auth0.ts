import { initAuth0 } from "@auth0/nextjs-auth0";

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
});
