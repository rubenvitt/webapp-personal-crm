import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { getSession, managementClient } from "../../../../config/auth0";
import { AvailableOnboardingStep } from "../../../../global/interfaces";
import { checkDataForStep } from "../../../../hooks/onboarding";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user: sessionUser } = getSession(req, res);
  const step: AvailableOnboardingStep = req.query.id as AvailableOnboardingStep;
  const data: unknown = req.body;

  const valid: boolean = checkDataForStep(step, data);

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
