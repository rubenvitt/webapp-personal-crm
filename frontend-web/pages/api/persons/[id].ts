import { NextApiRequest, NextApiResponse } from "next";
import { apiFindPersonDetailsFor } from "../../../api-functions/persons";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let personDetails = apiFindPersonDetailsFor(req.query.id as string);
  if (personDetails) {
    res.status(200).json(personDetails);
  } else {
    res.status(404).json({ status: "Person not found" });
  }
});

export default handler;
