import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  apiDeleteCommentForPerson,
  apiUpdateCommentForPerson,
} from "../../../../../api-functions/persons";
import { withApiAuthRequired } from "../../../../../config/auth0";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.delete(async (req, res) => {
  await apiDeleteCommentForPerson(
    req.query.id as string,
    req.query.cid as string
  );

  res.status(202).send(null);
});

handler.put(async (req, res) => {
  await apiUpdateCommentForPerson(
    req.query.id as string,
    req.query.cid as string,
    req.body
  );

  res.status(202).send(null);
});

export default withApiAuthRequired(handler);
