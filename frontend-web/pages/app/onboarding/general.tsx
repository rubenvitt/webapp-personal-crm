import React, { useRef } from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../../api-functions/defaults";
import { TextInput } from "../../../components/elements/common/input.component";
import { FormSection } from "../../../components/modules/common/form/section.component";
import { OnboardProgressContent } from "../../../components/modules/onboard/onboard-progress-content.component";
import { OnboardProgressNav } from "../../../components/modules/onboard/onboard-progress-nav.component";
import {
  useCurrentUser,
  useUserOnboarding,
} from "../../../services/account-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

export default function General(): JSX.Element {
  const form = useRef<HTMLFormElement>();
  const { currentUser } = useCurrentUser();
  const givenNameRef = useRef<HTMLInputElement>();
  const familyNameRef = useRef<HTMLInputElement>();
  const pictureRef = useRef<HTMLInputElement>();
  const { updateCurrentStep } = useUserOnboarding();

  return (
    <>
      <OnboardProgressNav />
      <OnboardProgressContent
        stepId={"2"}
        next={{
          onSubmit: () => {
            const valid = form.current.reportValidity();
            if (valid) {
              updateCurrentStep({
                data: {
                  givenName: givenNameRef.current.value,
                  familyName: familyNameRef.current.value,
                  pictureRef: pictureRef.current.value,
                },
                step: "general",
              });
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          },
        }}
      >
        <form ref={form}>
          <FormSection
            title="Profile"
            titleAsRow
            description="Check your name and personal information"
          >
            <TextInput
              ref={givenNameRef}
              change={(s) => undefined}
              title="Vorname"
              label="Vorname"
              className="col-span-4 sm:col-span-2"
              value={currentUser?.given_name ?? currentUser?.name}
            />
            <TextInput
              ref={familyNameRef}
              change={(s) => undefined}
              title="Nachname"
              label="Nachname"
              className="col-span-4 sm:col-span-2"
              value={currentUser?.family_name}
            />
            <TextInput
              ref={pictureRef}
              change={(s) => undefined}
              className={"col-span-4"}
              value={currentUser?.picture}
              title="Profilbild"
              label="Profilbild"
            />
          </FormSection>
        </form>
      </OnboardProgressContent>
    </>
  );
}
