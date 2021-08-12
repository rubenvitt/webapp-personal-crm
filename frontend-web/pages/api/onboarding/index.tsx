import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiGetCurrentUser } from "../../../api-functions/defaults";
import { AvailableOnboardingStep } from "../../../global/interfaces";
import { checkDataForStep } from "../../../hooks/onboarding";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

function orderForStep(step: AvailableOnboardingStep) {
  switch (step) {
    case "setup":
      return 1;
    case "plans":
      return 2;
    case "general":
      return 3;
    case "consent":
      return 4;
  }
}

function stepForIndex(index: number) {
  switch (index) {
    case 0:
      return "none";
    case 1:
      return "setup";
    case 2:
      return "plans";
    case 3:
      return "general";
    case 4:
      return "consent";
  }
}

handler.get(async (req, res) => {
  const { userPromise } = apiGetCurrentUser(req, res);

  userPromise.then((user) => {
    const nextStep: AvailableOnboardingStep = stepForIndex(
      orderForStep(
        user.app_metadata.onboarding.completed
          .filter((value) => {
            return checkDataForStep(value.step, value.data);
          })
          .sort((a, b) => orderForStep(a.step) - orderForStep(b.step))?.[0].step
      ) - 1 ?? 0
    );

    console.log(
      "currentStep",
      orderForStep(
        user.app_metadata.onboarding.completed
          .filter((value) => {
            return checkDataForStep(value.step, value.data);
          })
          .sort((a, b) => orderForStep(b.step) - orderForStep(a.step))?.[0].step
      )
    );

    res.send({
      currentStep: nextStep,
      steps: (
        [
          {
            id: "consent",
            name: "Privacy Policy & Terms of Service",
          },
          {
            id: "general",
            name: "Allgemein",
          },
          {
            id: "plans",
            name: "Plans & Payment",
          },
          {
            id: "setup",
            name: "App Setup",
          },
        ] as { id: AvailableOnboardingStep; name: string }[]
      ).sort((a, b) => orderForStep(b.id) - orderForStep(a.id)),
    });
  });
});

export default handler;
