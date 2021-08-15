import { AxiosError } from "axios";
import React from "react";
import { useMutation } from "react-query";
import { CreatePerson, IdOnly } from "../../../../global/interfaces";
import { usePersonNavigate } from "../../../../global/person-utils";
import { URL_API_Persons } from "../../../../global/urls";
import { createPerson } from "../../../../services/person-service";
import { FormLayout } from "../../common/form/form.layout.component";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "../detail-page/edit/essential-form-section.component";

export const CreatePersonForm: React.FC = () => {
  const { formValue } = useEssentialFormStore();
  const { navigateTo } = usePersonNavigate();
  const { mutateAsync } = useMutation<IdOnly, AxiosError, CreatePerson>(
    URL_API_Persons,
    (aPerson) => {
      return createPerson(aPerson);
    }
  );

  const createContact = async () => {
    return await mutateAsync(formValue).then((idOnly) => navigateTo(idOnly));
  };

  return (
    <FormLayout
      save={{
        action: createContact,
      }}
    >
      <EssentialFormSection />
    </FormLayout>
  );
};
