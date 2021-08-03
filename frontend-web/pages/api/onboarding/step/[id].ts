import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { getSession, managementClient } from "../../../../config/auth0";
import {
  LAST_AGB_VERSION,
  LAST_PRIVACY_VERSION,
} from "../../../../global/onboarding";

const handler = nextConnect();

function checkDataForStep(step: string, data: unknown): boolean {
  switch (step) {
    case "consent":
      return (
        (data as { privacy: string }).privacy === LAST_PRIVACY_VERSION &&
        (data as { agb: string }).agb === LAST_AGB_VERSION
      );
    default:
      return true;
  }
}

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user: sessionUser } = getSession(req, res);
  const step: string | string[] = req.query.id;
  const data: unknown = req.body;

  const valid: boolean = checkDataForStep(step as string, data);

  if (valid) {
    await managementClient
      .getUser({ id: sessionUser.sub })
      .then(async (user) => {
        await managementClient.updateUser(
          { id: sessionUser.sub },
          {
            app_metadata: {
              onboarding: {
                completed: [
                  ...(user.app_metadata?.onboarding?.completed?.filter(
                    (e) => e.step !== step
                  ) ?? []),
                  {
                    step: step,
                    dateTime: new Date().toISOString(),
                    data: data,
                  },
                ],
              },
            },
          }
        );
      });
    res.status(202).end();
  } else {
    res.status(400).end();
  }
});

export default handler;
