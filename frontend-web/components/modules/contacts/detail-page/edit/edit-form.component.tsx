import React from "react";
import { usePersonMutation } from "../../../../../client-http/person";
import { PersonDetails, UpdatePerson } from "../../../../../global/interfaces";
import { usePerson } from "../../../../../services/person-service";
import { FormLayout } from "../../../common/form/form.layout.component";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "./essential-form-section.component";

interface Props {
  person: PersonDetails;
}

export const EditPersonForm: React.FC<Props> = ({ person }) => {
  const { formValue: essentialFormValue } = useEssentialFormStore();

  const { navigateTo } = usePerson(person._id);
  const { updatePerson } = usePersonMutation(person);

  if (!updatePerson) {
    return <>Loading</>;
  }

  return (
    <>
      <FormLayout
        cancel={{ action: navigateTo }}
        save={{
          action: () => {
            return Promise.resolve(
              updatePerson(essentialFormValue as UpdatePerson)
            ).then(navigateTo);
          },
        }}
      >
        <EssentialFormSection personDetails={person} />
      </FormLayout>
    </>
  );
};
