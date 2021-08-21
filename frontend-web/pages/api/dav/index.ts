import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { withApiAuthRequired } from "../../../config/auth0";
import { apiSabre } from "../../../global/constants";

const handler = nextConnect();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.send({
    url: apiSabre.url,
  });
});

export default withApiAuthRequired(handler);
