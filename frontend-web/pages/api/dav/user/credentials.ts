import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { decryptText } from "../../../../config/sabre.api";
import {
  getSession,
  managementClient,
  withApiAuthRequired,
} from "../../../../config/auth0";
import { Logger } from "../../../../global/logging";
import { AxiosError } from "axios";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user: sessionUser } = getSession(req, res);
  const user = await managementClient.getUser({ id: sessionUser.sub });

  const userPromise = decryptText(user.user_metadata.dav.user).catch(
    (error: AxiosError) =>
      Logger.error("error", error.isAxiosError && error.response?.data)
  );
  const passwordPromise = decryptText(user.user_metadata.dav.pass).catch(
    (error: AxiosError) =>
      Logger.error("error", error.isAxiosError && error.response?.data)
  );

  userPromise.then((username) => {
    passwordPromise.then((password) => {
      res.send({
        username,
        password,
      });
    });
  });
});

export default withApiAuthRequired(handler);
