import { mutate } from "swr";
import { usePersonNavigate } from "../../../../globals/person-utils";
import { URL_API_Persons } from "../../../../globals/urls";
import { createPerson } from "../../../../services/person-service";
import { FormLayout } from "../../common/form/form.layout.component";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "../../../../components-old/contacts/detail/form/essential-form-section.component";

export const CreatePersonForm: React.FC = () => {
  const { formValue } = useEssentialFormStore();
  const { navigateTo } = usePersonNavigate();

  const createContact = async () => {
    await createPerson(formValue);
    await mutate(URL_API_Persons).then(() => navigateTo());
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
