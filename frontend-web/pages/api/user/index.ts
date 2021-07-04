import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getSession,
  managementClient,
  withApiAuthRequired,
} from "../../../globals/auth0";
import { givenOrNull } from "../../../globals/utils";

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

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = getSession(req, res);
  if (!givenOrNull(req.body.given_name + req.body.family_name)) {
    res.status(400).send({
      message: "given_name or family_name is mandatory",
    });
  }
  await managementClient
    .updateUser(
      {
        id: user.sub,
      },
      {
        given_name: givenOrNull(req.body.given_name),
        family_name: givenOrNull(req.body.family_name),
        picture: givenOrNull(req.body.picture),
        name: [
          givenOrNull(req.body.given_name),
          givenOrNull(req.body.family_name),
        ]
          .filter((x) => x !== null)
          .join(" "),
      }
    )
    .then(() => {
      res.status(200).end();
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

export default withApiAuthRequired(handler);
