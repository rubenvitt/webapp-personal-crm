import nextConnect from "next-connect";
import dbConnect from "../../../api-functions/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { apiFindAllPersons } from "../../../api-functions/persons";

const handler = nextConnect();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const filters = req.query.filter;
  console.log("using filter", filters);
  if (filters === "favorites") {
    apiFindAllPersons().then((value) => {
      res.json([value[0], value[1], value[13], value[2]].filter((it) => it));
    });
  } else {
    apiFindAllPersons().then((persons) => {
      res.json(persons);
    });
  }
});

export default handler;
