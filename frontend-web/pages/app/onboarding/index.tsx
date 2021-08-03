import { useEffect } from "react";
import { useAppRouter } from "../../../global/router";
import { useUserOnboarding } from "../../../services/account-service";

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
