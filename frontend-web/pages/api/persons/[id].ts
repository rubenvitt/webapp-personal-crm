import { NextApiRequest, NextApiResponse } from "next";
import {
  apiFindPersonDetailsFor,
  apiUpdatePerson,
} from "../../../api-functions/persons";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(404);
  }
  const personDetails = await apiFindPersonDetailsFor(req.query.id as string);
  if (personDetails) {
    await res.status(200).json(personDetails);
  } else {
    await res
      .status(404)
      .json({ status: "Person with id " + req.query.id + " not found" });
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("data for update:", req.body);

  const id = await apiUpdatePerson(req.body);
  if (id.upserted[0]) {
    await res.status(200).json({ _id: id.upserted[0]._id });
  } else {
    await res.status(403).json({
      status: "Person with id " + req.body._id + " not updated",
    });
  }
});

export default handler;
