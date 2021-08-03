import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get((req, res) => {
  res.send({
    currentStep: "consent",
    steps: [
      {
        id: "consent",
        name: "Privacy Policy & Terms of Service",
      },
      {
        id: "general",
        name: "Allgemein",
      },
      {
        id: "plans",
        name: "Plans & Payment",
      },
      {
        id: "setup",
        name: "App Setup",
      },
    ],
  });
});

export default handler;
