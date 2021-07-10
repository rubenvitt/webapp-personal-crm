import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { findAllSabreUser } from "../../../globals/sabre.api";
import { withApiAuthRequired } from "../../../globals/auth0";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await findAllSabreUser();
  res.status(200).send({ data: users });
});

export default withApiAuthRequired(handler);
