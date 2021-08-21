import React from "react";
import { usePersonMutation } from "../../../../client-http/person";
import { FormLayout } from "../../common/form/form.layout.component";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "../detail-page/edit/essential-form-section.component";

export const CreatePersonForm: React.FC = () => {
  const { formValue } = useEssentialFormStore();
  const { createPerson } = usePersonMutation();

  return (
    <FormLayout
      save={{
        action: () => createPerson(formValue),
      }}
    >
      <EssentialFormSection />
    </FormLayout>
  );
};
