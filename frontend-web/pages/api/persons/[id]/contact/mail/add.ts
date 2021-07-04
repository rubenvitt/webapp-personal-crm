import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { apiAddMailForPerson } from "../../../../../../api-functions/persons";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const value = req.body;

  console.log("adding mail for id:", id, "value:", value);
  await apiAddMailForPerson(id, value);
  res.status(200).send(null);
});

export default handler;
