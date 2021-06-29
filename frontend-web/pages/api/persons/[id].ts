import { NextApiRequest, NextApiResponse } from "next";
import {
  apiDeletePerson,
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
  console.log("update user:", req.body);

  const result = await apiUpdatePerson(req.body);
  console.log("returning:", result);
  if (result.n === result.ok) {
    await res.status(200).send(null);
  } else {
    await res.status(400).json({
      status: "Person with id " + req.body._id + " not updated",
    });
  }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("remove user:", req.query.id);

  const result = await apiDeletePerson(req.query.id as string);
  if (result.deletedCount === 1) {
    await res.status(200).send(null);
  } else {
    await res.status(400).json({
      status: "Too many elements deleted",
    });
  }
});

export default handler;
