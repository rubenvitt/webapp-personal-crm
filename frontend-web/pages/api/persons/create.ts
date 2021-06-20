import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../api-functions/dbConnect";
import { apiCreatePerson } from "../../../api-functions/persons";

const handler = nextConnect();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  apiCreatePerson(req.body).then((value) => {
    res.json({
      id: value["id"],
    });
  });
});

export default handler;
