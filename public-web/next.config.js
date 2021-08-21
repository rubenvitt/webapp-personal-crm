/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    AUTH0_BASE_URL:
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      process.env.AUTH0_BASE_URL ||
      "http://localhost:" + (process.env.PORT ?? "3001"),
  },
  images: {
    domains: ["images.unsplash.com", "randomuser.me"],
  },
};
