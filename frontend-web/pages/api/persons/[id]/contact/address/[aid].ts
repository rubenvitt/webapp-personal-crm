import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  apiDeleteAddressForPerson,
  apiUpdateAddressForPerson,
} from "../../../../../../api-functions/persons";
import { Logger } from "../../../../../../global/logging";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.delete(async (req, res) => {
  const personId = req.query.id as string;
  const addressId = req.query.aid as string;

  await apiDeleteAddressForPerson(personId, addressId);
  return res.status(200).send(null);
});

handler.put(async (req, res) => {
  const personId = req.query.id as string;
  const addressId = req.query.aid as string;

  Logger.log("my new address is", req.body);

  await apiUpdateAddressForPerson(personId, addressId, req.body);
  return res.status(200).send(null);
});

export default handler;
