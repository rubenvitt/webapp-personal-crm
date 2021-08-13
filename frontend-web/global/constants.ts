export const apiMongoUrl =
  process.env.MONGO_DB_CONNECTION ??
  (() => {
    throw new Error("Environment variable 'MONGO_DB_CONNECTION' is mandatory");
  })();

export const apiVercel = {
  env: process.env.VERCEL_ENV,
  port: process.env.PORT,
};

export const publicVercel = {
  url: process.env.NEXT_PUBLIC_VERCEL_URL,
};

export const apiSabre = {
  url:
    process.env.SABRE_URL ??
    (() => {
      throw new Error("Environment variable 'SABRE_URL' is mandatory");
    })(),
  apiUrl:
    process.env.SABRE_API_URL ??
    (() => {
      throw new Error("Environment variable 'SABRE_API_URL' is mandatory");
    })(),
  cryptoSecret1:
    process.env.CRYPTO_SECRET_KEY_1 ??
    (() => {
      throw new Error(
        "Environment variable 'CRYPTO_SECRET_KEY_1' is mandatory"
      );
    })(),
  cryptoSecret2:
    process.env.CRYPTO_SECRET_KEY_2 ??
    (() => {
      throw new Error(
        "Environment variable 'CRYPTO_SECRET_KEY_2' is mandatory"
      );
    })(),
};

export const apiAuth0 = {
  baseUrl:
    process.env.AUTH0_BASE_URL ??
    (() => {
      throw new Error("Environment variable 'AUTH0_BASE_URL' is mandatory");
    })(),

  planPro:
    process.env.AUTH0_ROLE_PRO ??
    (() => {
      throw new Error("Environment variable 'AUTH0_ROLE_PRO' is mandatory");
    })(),
  planPremium:
    process.env.AUTH0_ROLE_PREMIUM ??
    (() => {
      throw new Error("Environment variable 'AUTH0_ROLE_PREMIUM' is mandatory");
    })(),
  planFree:
    process.env.AUTH0_ROLE_FREE ??
    (() => {
      throw new Error("Environment variable 'AUTH0_ROLE_FREE' is mandatory");
    })(),
};

export const apiAuth0Client = {
  id:
    process.env.API_AUTH0_CLIENT_ID ??
    (() => {
      throw new Error(
        "Environment variable 'API_AUTH0_CLIENT_ID' is mandatory"
      );
    })(),

  secret:
    process.env.API_AUTH0_CLIENT_SECRET ??
    (() => {
      throw new Error(
        "Environment variable 'API_AUTH0_CLIENT_SECRET' is mandatory"
      );
    })(),

  domain:
    process.env.API_AUTH0_CLIENT_DOMAIN ??
    (() => {
      throw new Error(
        "Environment variable 'API_AUTH0_CLIENT_DOMAIN' is mandatory"
      );
    })(),
};

export const apiStripe = {
  endpointSecret:
    process.env.STRIPE_ENDPOINT_SECRET ??
    (() => {
      throw new Error(
        "Environment variable 'STRIPE_ENDPOINT_SECRET' is mandatory"
      );
    })(),
  stripeSecretKey:
    process.env.STRIPE_SK ??
    (() => {
      throw new Error("Environment variable 'STRIPE_SK' is mandatory");
    })(),

  planPro:
    process.env.STRIPE_PLAN_PRO ??
    (() => {
      throw new Error("Environment variable 'STRIPE_PLAN_PRO' is mandatory");
    })(),
  planPremium:
    process.env.STRIPE_PLAN_PREMIUM ??
    (() => {
      throw new Error(
        "Environment variable 'STRIPE_PLAN_PREMIUM' is mandatory"
      );
    })(),
};
