import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  const type = req.query.type;
  let privacyMessage =
    type === "privacy" ? "PRIVACY MESSAGE\n\n" : "AGB MESSAGE\n\n";
  for (let i = 0; i < 1000; i++) {
    privacyMessage += "Dies ist die " + i + ". Zeile des Textes.\n\n";
  }
  res.send({ text: privacyMessage });
});

export default handler;
