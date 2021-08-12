import { faMoneyCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../../api-functions/defaults";
import { Button } from "../../../components/elements/common/button.component";
import { OnboardProgressContent } from "../../../components/modules/onboard/onboard-progress-content.component";
import { OnboardProgressNav } from "../../../components/modules/onboard/onboard-progress-nav.component";
import { SubscriptionType } from "../../../global/interfaces";
import { Logger } from "../../../global/logging";
import { useAppRouter } from "../../../global/router";
import {
  useCurrentUser,
  useUserOnboarding,
} from "../../../services/account-service";
import { usePayment } from "../../../services/payment-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

export default function Plans(): JSX.Element {
  const { updateCurrentStep } = useUserOnboarding();
  const { currentUser } = useCurrentUser();
  const { createPayment } = usePayment();
  const { push } = useAppRouter();

  useEffect(() => {
    Logger.log("CurrentUser roles", currentUser?.roles);
    if (currentUser?.roles.length) {
      Promise.resolve(
        updateCurrentStep({
          step: "plans",
          data: {},
        })
      ).then(() => push("/onboarding"));
    }
  }, [currentUser]);

  return (
    <>
      <OnboardProgressNav />
      <OnboardProgressContent
        stepId={"3"}
        next={{
          onSubmit: () => undefined,
          disabled: true,
        }}
      >
        <Button action={() => createPayment(SubscriptionType.PRO)}>
          <FontAwesomeIcon className="pr-2" size="2x" icon={faMoneyCheck} />
          Checkout
        </Button>
      </OnboardProgressContent>
    </>
  );
}
