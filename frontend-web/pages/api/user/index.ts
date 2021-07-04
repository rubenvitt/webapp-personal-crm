import nextConnect from "next-connect";
import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import auth0, { managementClient } from "../../../globals/auth0";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user: sessionUser } = getSession(req, res);
  await managementClient.updateUser(
    {
      id: sessionUser.sub,
    },
    {
      user_metadata: {
        online_test: "success",
      },
      email_verified: false,
    }
  );

  const user = await managementClient.getUser({
    id: sessionUser.sub,
  });

  res.send(user);
});

export default auth0.withApiAuthRequired(handler);
