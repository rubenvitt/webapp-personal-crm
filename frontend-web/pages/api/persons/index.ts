import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../api-functions/dbConnect";
import {
  apiCreatePerson,
  apiFindAllPersons,
} from "../../../api-functions/persons";
import { getSession } from "../../../config/auth0";
import { Logger } from "../../../global/logging";

const handler = nextConnect();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { user } = getSession(req, res);

  const filters = req.query.filter;
  Logger.log("find all persons with filters:", filters);
  if (filters === "favorites") {
    apiFindAllPersons({
      userId: user.sub,
      isFavorite: true,
    }).then((persons) => {
      res.json(persons);
    });
  } else {
    apiFindAllPersons({
      userId: user.sub,
    }).then((persons) => {
      res.json(persons);
    });
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { user } = getSession(req, res);

  apiCreatePerson({
    ...req.body,
    userId: user.sub,
  }).then((value) => {
    res.json({
      _id: value["id"],
    });
  });
});

export default handler;
