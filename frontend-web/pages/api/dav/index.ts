import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "../../../globals/auth0";

const handler = nextConnect();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.send({
    url: process.env.SABRE_URL,
  });
});

export default withApiAuthRequired(handler);
