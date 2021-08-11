import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { withApiAuthRequired } from "../../../config/auth0";
import { loadEnvironmentVar } from "../../../global/utils";

const handler = nextConnect();

const sabreUrl = loadEnvironmentVar("SABRE_URL", true);

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.send({
    url: sabreUrl,
  });
});

export default withApiAuthRequired(handler);
