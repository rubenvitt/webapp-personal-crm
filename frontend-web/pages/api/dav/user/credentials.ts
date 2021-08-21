import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiGetCurrentUser } from "../../../../api-functions/defaults";
import { withApiAuthRequired } from "../../../../config/auth0";
import { decryptText } from "../../../../config/sabre.api";
import { Logger } from "../../../../global/logging";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userPromise } = apiGetCurrentUser(req, res);

  userPromise.then((user) => {
    const userPromise = decryptText(user.user_metadata.dav?.user).catch(
      (error: AxiosError) =>
        Logger.error("error", error.isAxiosError && error.response?.data)
    );
    const passwordPromise = decryptText(user.user_metadata.dav?.pass).catch(
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
});

export default withApiAuthRequired(handler);
