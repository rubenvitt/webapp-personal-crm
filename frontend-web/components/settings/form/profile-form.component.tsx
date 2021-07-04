import { FormSection } from "../../common/form/section.component";
import { TextInput } from "../../common/input.component";
import { FormLayout } from "../../common/form/form.layout.component";
import React, { useRef } from "react";
import { useCurrentUser } from "../../../services/account-service";
import { classNames } from "../../../globals/utils";

interface Props {
  //
  placeholder?: string;
}

export const ProfileForm: React.FC<Props> = () => {
  const { currentUser, update } = useCurrentUser();
  const givenNameRef = useRef<HTMLInputElement>();
  const familyNameRef = useRef<HTMLInputElement>();
  const pictureRef = useRef<HTMLInputElement>();

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
          inputRef={givenNameRef}
          title="Vorname"
          className="col-span-4 sm:col-span-2"
          initialValue={currentUser?.given_name}
        />
        <TextInput
          inputRef={familyNameRef}
          title="Nachname"
          className="col-span-4 sm:col-span-2"
          initialValue={currentUser?.family_name}
        />
        <TextInput
          inputRef={pictureRef}
          className={"col-span-4"}
          initialValue={currentUser?.picture}
          title="Profilbild"
        />
      </FormSection>
      <FormSection
        title={"Account"}
        titleAsRow
        description={
          "Change your password, mail address and add Login Provider"
        }
      >
        <TextInput title={"test"} />
      </FormSection>
    </FormLayout>
  );
};
