import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { apiAddPhoneForPerson } from "../../../../../../api-functions/persons";
import { Logger } from "../../../../../../globals/logging";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const value = req.body;

  Logger.log("adding phone for id:", id, "value:", value);
  await apiAddPhoneForPerson(id, value);
  res.status(200).send(null);
});

export default handler;
