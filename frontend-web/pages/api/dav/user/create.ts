import { AxiosError } from "axios";
import * as crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiGetCurrentUser } from "../../../../api-functions/defaults";
import {
  managementClient,
  withApiAuthRequired,
} from "../../../../config/auth0";
import { createNewUser, encryptText } from "../../../../config/sabre.api";
import { apiSabre } from "../../../../global/constants";
import { Logger } from "../../../../global/logging";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, userPromise } = apiGetCurrentUser(req, res);
  const userHash = crypto
    .createHmac("md5", apiSabre.cryptoSecret1)
    .update(userId)
    .digest()
    .toString("hex");
  const passwordHash = crypto
    .createHmac("md5", apiSabre.cryptoSecret2)
    .update(userHash + apiSabre.cryptoSecret2 + crypto.randomBytes(16))
    .digest()
    .toString("hex");

  encryptText({ secret: userHash }).then(async (userEncrypted) => {
    const passEncrypted = await encryptText({ secret: passwordHash });
    await managementClient.updateUserMetadata(
      {
        id: userId,
      },
      {
        dav: {
          user: userEncrypted,
          pass: passEncrypted,
        },
      }
    );
  });

  await createNewUser({
    username: userHash,
    password: passwordHash,
    displayName: (await userPromise).name,
    email: (await userPromise).email,
  }).catch((err: AxiosError) => {
    Logger.error(
      "cannot create user",
      userHash,
      err.isAxiosError && err.response?.data
    );
  });
});

export default withApiAuthRequired(handler);
