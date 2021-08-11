import { faMoneyCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../../api-functions/defaults";
import { Button } from "../../../components/elements/common/button.component";
import { PaymentPlan } from "../../../global/interfaces";
import { useUserOnboarding } from "../../../services/account-service";
import { usePayment } from "../../../services/payment-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

export default function Plans(): JSX.Element {
  const { updateCurrentStep } = useUserOnboarding();
  const { createPayment } = usePayment();

  return (
    <>
      <Button action={() => createPayment(PaymentPlan.PRO)}>
        <FontAwesomeIcon className="pr-2" size="2x" icon={faMoneyCheck} />
        Checkout
      </Button>
    </>
  );
}
