import nextConnect from "next-connect";
import dbConnect from "../../../api-functions/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  apiCreatePerson,
  apiFindAllPersons,
} from "../../../api-functions/persons";
import { Logger } from "../../../globals/logging";

const handler = nextConnect();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const filters = req.query.filter;
  Logger.log("find all persons with filters:", filters);
  if (filters === "favorites") {
    apiFindAllPersons({
      isFavorite: true,
    }).then((persons) => {
      res.json(persons);
    });
  } else {
    apiFindAllPersons().then((persons) => {
      res.json(persons);
    });
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  apiCreatePerson(req.body).then((value) => {
    res.json({
      _id: value["id"],
    });
  });
});

export default handler;
