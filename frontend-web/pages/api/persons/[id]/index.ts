import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  apiDeletePerson,
  apiFindPersonDetailsFor,
  apiUpdatePerson,
} from "../../../../api-functions/persons";
import { getSession } from "../../../../config/auth0";
import { Logger } from "../../../../global/logging";

const handler = nextConnect();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(404);
  }
  const { user } = getSession(req, res);

  const personDetails = await apiFindPersonDetailsFor(
    req.query.id as string,
    user.sub
  );
  if (personDetails) {
    await res.status(200).json(personDetails);
  } else {
    await res
      .status(404)
      .json({ status: "Person with id " + req.query.id + " not found" });
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = getSession(req, res);
  Logger.log("I am here");
  res.status(200).send({});

  Logger.log("update user:", req.body);

  const result = await apiUpdatePerson(req.body, user.sub);
  Logger.log("returning:", result);
  if (result.n === result.ok) {
    await res.status(200).send(null);
  } else {
    await res.status(400).json({
      status: "Person with id " + req.body._id + " not updated",
    });
  }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  Logger.log("remove user:", req.query.id);
  const { user } = getSession(req, res);

  const result = await apiDeletePerson(req.query.id as string, user.sub);
  if (result) {
    await res.status(200).send(null);
  } else {
    await res.status(400).json({
      status: "Too many elements deleted",
    });
  }
});

export default handler;
