import { NextApiRequest, NextApiResponse } from "next";
import { apiFindPersonDetailsFor } from "../../../api-functions/persons";

export default async function findPersonDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let personDetails = apiFindPersonDetailsFor(req.query.id as string);
  if (personDetails) {
    res.status(200).json(personDetails);
  } else {
    res.status(404).json({ status: "Person not found" });
  }
}
