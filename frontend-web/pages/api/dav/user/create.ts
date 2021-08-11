import { AxiosError } from "axios";
import * as crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  getSession,
  managementClient,
  withApiAuthRequired,
} from "../../../../config/auth0";
import { createNewUser, encryptText } from "../../../../config/sabre.api";
import { Logger } from "../../../../global/logging";
import { loadEnvironmentVar } from "../../../../global/utils";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = getSession(req, res);
  const userHash = crypto
    .createHmac("md5", loadEnvironmentVar("CRYPTO_SECRET_KEY_1", true))
    .update(user.sub)
    .digest()
    .toString("hex");
  const passwordHash = crypto
    .createHmac("md5", loadEnvironmentVar("CRYPTO_SECRET_KEY_2", true))
    .update(
      userHash +
        loadEnvironmentVar("CRYPTO_SECRET_KEY_2", true) +
        crypto.randomBytes(16)
    )
    .digest()
    .toString("hex");

  encryptText({ secret: userHash }).then(async (userEncrypted) => {
    const passEncrypted = await encryptText({ secret: passwordHash });
    await managementClient.updateUserMetadata(
      {
        id: user.sub,
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
    displayName: user.name,
    email: user.email,
  }).catch((err: AxiosError) => {
    Logger.error(
      "cannot create user",
      userHash,
      err.isAxiosError && err.response?.data
    );
  });
});

export default withApiAuthRequired(handler);
