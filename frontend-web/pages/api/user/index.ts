import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiGetCurrentUser } from "../../../api-functions/defaults";
import { managementClient, withApiAuthRequired } from "../../../config/auth0";
import { givenOrNull } from "../../../global/utils";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userPromise: currentUser, userId } = apiGetCurrentUser(req, res);

  managementClient
    .getUserRoles({
      id: userId,
    })
    .then((roles) => {
      currentUser.then((user) => {
        res.send({
          ...user,
          roles,
          app_metadata: undefined,
        });
      });
    });
});

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userPromise, userId } = apiGetCurrentUser(req, res);
  if (!givenOrNull(req.body.given_name + req.body.family_name)) {
    res.status(400).send({
      message: "given_name or family_name is mandatory",
    });
  }
  await managementClient
    .updateUser(
      {
        id: userId,
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
