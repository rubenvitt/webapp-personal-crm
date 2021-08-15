import React, { useRef } from "react";
import { useQuery } from "react-query";
import { fetchConsent } from "../../../client-http/onboarding";
import { AcceptableDocument } from "../../../components/elements/common/acceptable-document.component";
import { OnboardProgressContent } from "../../../components/modules/onboard/onboard-progress-content.component";
import { OnboardProgressNav } from "../../../components/modules/onboard/onboard-progress-nav.component";
import { withPageAuthRequired } from "../../../config/auth0";
import { Logger } from "../../../global/logging";
import { useFormStore } from "../../../hooks/onboarding";
import { useUserOnboarding } from "../../../services/account-service";

export const getServerSideProps = withPageAuthRequired();

export default function Consent(): JSX.Element {
  const { privacy } = useFormStore();
  const form = useRef<HTMLFormElement>();
  const { data: privacyText } = useQuery(
    ["/api/onboarding/consent", "privacy"],
    fetchConsent
  );
  const { data: agbText } = useQuery(
    ["/api/onboarding/consent", "agb"],
    fetchConsent
  );
  const { updateCurrentStep } = useUserOnboarding();

  return (
    <>
      <OnboardProgressNav />
      <OnboardProgressContent
        stepId="1"
        next={{
          disabled: !privacy?.valid(),
          onSubmit: () => {
            const valid = form.current.reportValidity();
            if (valid) {
              updateCurrentStep({
                data: {
                  privacy: "v0",
                  agb: "v0",
                },
                step: "consent",
              });
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          },
        }}
      >
        <form ref={form}>
          <AcceptableDocument
            content={privacyText}
            id="privacy-policy"
            label={{
              withArticle: "die Datenschutzerklärung",
              title: "Datenschutzerklärung",
            }}
            required
            onChange={(value) => {
              Logger.log("update with value", value);
              privacy.updatePrivacy(value);
            }}
          />
          <AcceptableDocument
            content={agbText}
            className={"mt-4"}
            id="agb"
            label={{
              withArticle: "die allgemeinen Geschäftsbedingungen",
              title: "Allgemeine Geschäftsbedingungen",
            }}
            required
            onChange={privacy.updateAgb}
          />
        </form>
      </OnboardProgressContent>
    </>
  );
}
