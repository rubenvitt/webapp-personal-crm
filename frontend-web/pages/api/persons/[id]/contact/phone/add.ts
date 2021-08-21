import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiAddPhoneForPerson } from "../../../../../../api-functions/persons";
import { PersonPhone } from "../../../../../../global/interfaces";
import { Logger } from "../../../../../../global/logging";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const value = req.body as Omit<PersonPhone, "_id">;

  Logger.log("adding phone for id:", id, "value:", value);
  await apiAddPhoneForPerson(id, value);
  res.status(200).send(null);
});

export default handler;
