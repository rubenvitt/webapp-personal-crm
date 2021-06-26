import { NextApiRequest, NextApiResponse } from "next";
import { apiFindPersonDetailsFor } from "../../../api-functions/persons";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("try to get details for person with query:", req.query);
  const personDetails = await apiFindPersonDetailsFor(req.query.id as string);
  if (personDetails) {
    await res.status(200).json(personDetails);
  } else {
    await res
      .status(404)
      .json({ status: "Person with id " + req.query.id + " not found" });
  }
});

export default handler;
