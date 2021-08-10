import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiAddAddressForPerson } from "../../../../../../api-functions/persons";
import { Logger } from "../../../../../../global/logging";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const id = req.query.id as string;
  const value = req.body;

  Logger.log("adding address for id:", id, "value:", value);
  await apiAddAddressForPerson(id, value);
  res.status(200).send(null);
});

export default handler;
