import React from "react";
import { PersonDetails } from "../../../../globals/interfaces";
import {
  usePerson,
  usePersonMutation,
} from "../../../../services/person-service";
import { FormLayout } from "../../../common/form/form.layout.component";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "../form/essential-form-section.component";

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
          /*action: async () => {
                                                                        console.log("update person");
                                                                        mutatePerson(
                                                                          {
                                                                            _id: person._id,
                                                                            ...essentialFormValue,
                                                                          },
                                                                          false
                                                                        )
                                                                          .then(() => {
                                                                            mutatePerson(
                                                                              updatePerson({
                                                                                _id: person._id,
                                                                                ...essentialFormValue,
                                                                              })
                                                                            );
                                                                          })
                                                                          .then(() => {
                                                                            mutate(URL_API_Persons);
                                                                          });
                                                                      },*/
          action: () => {
            return updatePerson(essentialFormValue).then(navigateTo);
          },
        }}
      >
        <EssentialFormSection personDetails={person} />
      </FormLayout>
    </>
  );
};
