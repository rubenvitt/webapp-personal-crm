import React, { useRef } from "react";
import useSWR from "swr";
import { withAuthenticatedTranslatedServerSideProps } from "../../../api-functions/defaults";
import { AcceptableDocument } from "../../../components/elements/common/acceptable-document.component";
import { OnboardProgressContent } from "../../../components/modules/onboard/onboard-progress-content.component";
import { OnboardProgressNav } from "../../../components/modules/onboard/onboard-progress-nav.component";
import { Logger } from "../../../global/logging";
import { useFormStore } from "../../../hooks/onboarding";
import { useUserOnboarding } from "../../../services/account-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

export default function Consent(): JSX.Element {
  const { privacy } = useFormStore();
  const form = useRef<HTMLFormElement>();
  const { data: privacyData } = useSWR<{ text }>(
    "/onboarding/consent?type=privacy"
  );
  const { data: agbData } = useSWR<{ text }>("/onboarding/consent?type=agb");
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
            content={privacyData?.text}
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
            content={agbData?.text}
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
