import React, { useRef } from "react";
import { TextInput } from "../../../elements/common/input.component";
import { classNames } from "../../../../global/utils";
import { useCurrentUser } from "../../../../services/account-service";
import { FormLayout } from "../../common/form/form.layout.component";
import { FormSection } from "../../common/form/section.component";
import { Logger } from "../../../../global/logging";

interface Props {
  //
  placeholder?: string;
}

export const ProfileForm: React.FC<Props> = () => {
  const { currentUser, update } = useCurrentUser();
  const givenNameRef = useRef<HTMLInputElement>();
  const familyNameRef = useRef<HTMLInputElement>();
  const pictureRef = useRef<HTMLInputElement>();

  Logger.log("currentUser", currentUser);

  return (
    <FormLayout
      className={classNames("lg:col-span-9")}
      save={{
        action: () => {
          return update({
            given_name: givenNameRef.current.value,
            family_name: familyNameRef.current.value,
            picture: pictureRef.current.value,
          });
        },
      }}
    >
      <FormSection
        title="Profile"
        titleAsRow
        description="Change your name and personal information"
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
      <FormSection
        title={"Account"}
        titleAsRow
        description={
          "Change your password, mail address and add Login Provider"
        }
      >
        <TextInput change={(s) => undefined} label="test" title={"test"} />
      </FormSection>
    </FormLayout>
  );
};
