import React, { useRef, useState } from "react";
import { TextInput } from "../../../components/elements/common/input.component";
import { FormSection } from "../../../components/modules/common/form/section.component";
import { OnboardProgressContent } from "../../../components/modules/onboard/onboard-progress-content.component";
import { OnboardProgressNav } from "../../../components/modules/onboard/onboard-progress-nav.component";
import { withPageAuthRequired } from "../../../config/auth0";
import { Logger } from "../../../global/logging";
import {
  useCurrentUser,
  useUserOnboarding,
} from "../../../services/account-service";

export const getServerSideProps = withPageAuthRequired();

export default function General(): JSX.Element {
  const form = useRef<HTMLFormElement>();
  const { currentUser } = useCurrentUser();
  const [formValue, setFormValue] = useState({
    givenName: currentUser?.given_name,
    familyName: currentUser?.family_name,
    picture: currentUser?.picture,
  });
  const { updateCurrentStep } = useUserOnboarding();

  return (
    <>
      <OnboardProgressNav />
      <OnboardProgressContent
        stepId={"2"}
        next={{
          onSubmit: () => {
            const valid = form.current.reportValidity();
            Logger.log("given Name", formValue.givenName);
            if (valid) {
              updateCurrentStep({
                data: {
                  givenName: formValue.givenName,
                  familyName: formValue.familyName,
                  pictureRef: formValue.picture,
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
              change={(s) =>
                setFormValue((prev) => ({ ...prev, givenName: s }))
              }
              title="Vorname"
              label="Vorname"
              className="col-span-4 sm:col-span-2"
              value={currentUser?.given_name ?? currentUser?.name}
            />
            <TextInput
              change={(s) =>
                setFormValue((prev) => ({ ...prev, familyName: s }))
              }
              title="Nachname"
              label="Nachname"
              className="col-span-4 sm:col-span-2"
              value={currentUser?.family_name}
            />
            <TextInput
              change={(s) => setFormValue((prev) => ({ ...prev, picture: s }))}
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
