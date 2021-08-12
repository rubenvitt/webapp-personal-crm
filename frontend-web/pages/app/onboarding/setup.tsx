import { withAuthenticatedTranslatedServerSideProps } from "../../../api-functions/defaults";
import { OnboardProgressContent } from "../../../components/modules/onboard/onboard-progress-content.component";
import { OnboardProgressNav } from "../../../components/modules/onboard/onboard-progress-nav.component";
import { useUserOnboarding } from "../../../services/account-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

export default function Setup(): JSX.Element {
  const { updateCurrentStep } = useUserOnboarding();

  return (
    <>
      <OnboardProgressNav />
      <OnboardProgressContent
        stepId={"4"}
        next={{
          onSubmit: () => {
            updateCurrentStep({
              step: "setup",
              data: {},
            });
            return Promise.resolve();
          },
          label: "Anwendung starten",
        }}
      >
        Nichts weiter zu tun...
      </OnboardProgressContent>
    </>
  );
}
