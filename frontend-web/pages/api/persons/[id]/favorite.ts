import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { apiFavoritePerson } from "../../../../api-functions/persons";
import { Logger } from "../../../../globals/logging";

const handler = nextConnect();

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  Logger.log("Set favorite for person with id", id, "to", req.body);
  apiFavoritePerson(id, req.body.status).then((r) => {
    if (r.n === r.ok) {
      res.status(200).send(null);
    } else {
      res.status(400).send(null);
    }
  });
});

export default handler;
