import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  apiDeleteMailForPerson,
  apiUpdateMailForPerson,
} from "../../../../../../api-functions/persons";

const handler = nextConnect();

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const personId = req.query.id as string;
  const phoneId = req.query.pid as string;

  await apiDeleteMailForPerson(personId, phoneId);
  return res.status(200).send(null);
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const personId = req.query.id as string;
  const phoneId = req.query.pid as string;

  await apiUpdateMailForPerson(personId, phoneId, req.body);
  return res.status(200).send(null);
});

export default handler;
