export const apiMongoUrl = process.env.MONGO_DB_CONNECTION;

export const apiVercel = {
  env: process.env.VERCEL_ENV,
  port: process.env.PORT,
};

export const publicVercel = {
  url: process.env.NEXT_PUBLIC_VERCEL_URL,
};

export const apiSabre = {
  url: process.env.SABRE_URL,
  apiUrl: process.env.SABRE_API_URL,
  cryptoSecret1: process.env.CRYPTO_SECRET_KEY_1,
  cryptoSecret2: process.env.CRYPTO_SECRET_KEY_2,
};

export const apiAuth0 = {
  baseUrl: process.env.AUTH0_BASE_URL,

  planPro: process.env.AUTH0_ROLE_PRO,
  planPremium: process.env.AUTH0_ROLE_PREMIUM,
  planFree: process.env.AUTH0_ROLE_FREE,
};

export const apiAuth0Client = {
  id: process.env.API_AUTH0_CLIENT_ID,
  secret: process.env.API_AUTH0_CLIENT_SECRET,
  domain: process.env.API_AUTH0_CLIENT_DOMAIN,
};

export const apiStripe = {
  endpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
  stripeSecretKey: process.env.STRIPE_SK,

  planPro: process.env.STRIPE_PLAN_PRO,
  planPremium: process.env.STRIPE_PLAN_PREMIUM,
};
