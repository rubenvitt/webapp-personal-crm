import { NextApiRequest, NextApiResponse } from "next";
import { apiFindAllPersons } from "../../../api-functions/persons";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(apiFindAllPersons());
}
