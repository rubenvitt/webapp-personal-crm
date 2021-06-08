import { NextApiRequest, NextApiResponse } from "next";
import { mockPersons } from "../../../mocks/mocks.data";

export default async function findPersonDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let personDetails = mockPersons.find((a) => a.id === req.query.id);
  if (personDetails) {
    res.status(200).json(personDetails);
  } else {
    res.status(404).json({ status: "Person not found" });
  }
}
