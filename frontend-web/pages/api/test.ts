import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { Logger } from "../../global/logging";

const handler = nextConnect();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  Logger.log("got get");

  res.status(200).send({});
});
