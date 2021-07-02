import { FormLayout } from "../../../common/form/form.layout.component";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "../form/essential-form-section.component";
import { usePersonNavigate } from "../../../../globals/person-utils";
import { mutate } from "swr";
import { URL_API_Persons } from "../../../../globals/urls";
import { createPerson } from "../../../../services/person-service";

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
