import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiGetCurrentUser } from "../../../../api-functions/defaults";
import { managementClient } from "../../../../config/auth0";
import { AvailableOnboardingStep } from "../../../../global/interfaces";
import { checkDataForStep } from "../../../../hooks/onboarding";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userPromise, userId } = apiGetCurrentUser(req, res);
  const step: AvailableOnboardingStep = req.query.id as AvailableOnboardingStep;
  const data: unknown = req.body;

  const valid: boolean = checkDataForStep(step, data);

  if (valid) {
    await userPromise.then(async (user) => {
      await managementClient.updateUser(
        { id: userId },
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
