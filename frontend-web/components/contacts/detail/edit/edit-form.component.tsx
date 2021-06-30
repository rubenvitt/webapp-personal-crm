import { PersonDetails, UpdatePerson } from "../../../../globals/interfaces";
import React from "react";
import { FormLayout } from "../../../common/form/form.layout.component";
import { useMutation } from "react-query";
import { reactQuery } from "../../../../globals/react-query.config";
import { updatePerson } from "../../../../services/person-service";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "../form/essential-form-section.component";
import { usePersonNavigate } from "../../../../globals/person-utils";

interface Props {
  person: PersonDetails;
}

export const EditPersonForm: React.FC<Props> = ({ person }) => {
  const { formValue: essentialFormValue } = useEssentialFormStore();

  const { navigateTo } = usePersonNavigate();

  const { mutate, isLoading } = useMutation<void, unknown, UpdatePerson>(
    "update-contacts",
    async (element) => {
      return await updatePerson(element);
    },
    {
      onSuccess: async () => {
        await reactQuery.invalidateQueries("persons");
        await reactQuery.invalidateQueries(["persons", person._id]);
        await navigateTo(person);
      },
    }
  );

  return (
    <>
      <FormLayout
        cancel={{ action: () => navigateTo(person) }}
        save={{
          isLoading,
          action: () => {
            console.log("update person");
            mutate({
              _id: person._id,
              ...essentialFormValue,
            });
          },
        }}
      >
        <EssentialFormSection personDetails={person} />
      </FormLayout>
    </>
  );
};
