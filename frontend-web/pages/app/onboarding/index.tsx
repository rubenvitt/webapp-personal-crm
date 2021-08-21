import { useEffect } from "react";
import { withPageAuthRequired } from "../../../config/auth0";
import { useAppRouter } from "../../../global/router";
import { useUserOnboarding } from "../../../services/account-service";

export const getServerSideProps = withPageAuthRequired();

export default function Onboarding(): JSX.Element {
  const { push } = useAppRouter();
  const { currentStep } = useUserOnboarding();

  useEffect(() => {
    if (currentStep === "none") {
      push("/");
    }
    if (currentStep) {
      push(`/onboarding/${currentStep}`);
    }
  }, [currentStep]);

  return <>Loading</>;
}
