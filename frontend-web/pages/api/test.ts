// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(function (req, res) {
  res.send(
    (process.env.NEXT_PUBLIC_VERCEL_URL &&
      "https://" + process.env.NEXT_PUBLIC_VERCEL_URL) ||
      process.env.AUTH0_BASE_URL ||
      "http://localhost:" + (process.env.PORT ?? "3000")
  );
});
