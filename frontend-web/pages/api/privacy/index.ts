import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  let privacyMessage = "";
  for (let i = 0; i < 1000; i++) {
    privacyMessage += "Dies ist die " + i + ". Zeile des Textes.\n\n";
  }
  res.send({ text: privacyMessage });
});

export default handler;
