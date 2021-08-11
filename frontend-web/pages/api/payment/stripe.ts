import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.all((req, res) => {
  //
  if (req.body.type === "invoice.payment_succeeded") {
    console.log(req.method);
    console.log(req.body);
  }
});

export default handler;
