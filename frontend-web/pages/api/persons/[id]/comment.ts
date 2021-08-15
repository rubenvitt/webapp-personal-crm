import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiAddCommentForPerson } from "../../../../api-functions/persons";
import { withApiAuthRequired } from "../../../../config/auth0";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  await apiAddCommentForPerson(req.query.id as string, req.body);
  res.status(202).send(null);
});

export default withApiAuthRequired(handler);
