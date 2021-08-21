import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  res.send("finished");
});

export default handler;
