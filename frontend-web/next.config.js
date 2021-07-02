/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
module.exports = {
  images: {
    domains: ["images.unsplash.com", "randomuser.me"],
  },
  env: {
    AUTH0_BASE_URL:
      process.env.VERCEL_URL ||
      process.env.AUTH0_BASE_URL ||
      "http://localhost:" + (process.env.PORT ?? "3000"),
  },
};
