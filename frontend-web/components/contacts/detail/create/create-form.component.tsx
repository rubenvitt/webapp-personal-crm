import { FormLayout } from "../../../common/form/form.layout.component";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "../form/essential-form-section.component";
import { useMutation } from "react-query";
import { CreatePerson, IdOnly } from "../../../../globals/interfaces";
import { createPerson } from "../../../../services/person-service";
import { reactQuery } from "../../../../globals/react-query.config";
import { usePersonNavigate } from "../../../../globals/person-utils";

export const CreatePersonForm: React.FC = () => {
  const { formValue } = useEssentialFormStore();
  const { navigateTo } = usePersonNavigate();

  const { isLoading, mutate } = useMutation<IdOnly, unknown, CreatePerson>(
    "create-contacts",
    (element) => {
      console.log("going to create person", element);
      return createPerson({
        ...element,
      });
    },
    {
      onSuccess: async (person) => {
        await reactQuery.invalidateQueries("persons").then(() => {
          navigateTo(person);
        });
      },
    }
  );

  const createContact = () => {
    if (!isLoading) {
      mutate(formValue);
    }
  };

  return (
    <FormLayout
      save={{
        isLoading: isLoading,
        action: createContact,
      }}
    >
      <EssentialFormSection />
    </FormLayout>
  );
};
