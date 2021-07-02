// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function (req, res) {
  res.send(process.env.VERCEL_URL);
  /*res.send(
    (process.env.NEXT_PUBLIC_VERCEL_URL &&
      "https://" + process.env.NEXT_PUBLIC_VERCEL_URL) ||
      process.env.AUTH0_BASE_URL ||
      "http://localhost:" + (process.env.PORT ?? "3000")
  );*/
}
