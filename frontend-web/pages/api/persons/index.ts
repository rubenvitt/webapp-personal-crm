import { NextApiRequest, NextApiResponse } from "next";
import { mockPersons } from "../../../mocks/mocks.data";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(mockPersons);
}
