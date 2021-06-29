import { FormLayout } from "../../../common/form/form.layout.component";
import {
  EssentialFormSection,
  useEssentialFormStore,
} from "../form/essential-form-section.component";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { CreatePerson, IdOnly } from "../../../../globals/interfaces";
import { createPerson } from "../../../../services/person-service";
import { reactQuery } from "../../../../globals/react-query.config";

interface Props {}

export const CreatePersonForm: React.FC<Props> = () => {
  const { formValue } = useEssentialFormStore();
  const { push } = useRouter();

  const { isLoading, mutate } = useMutation<IdOnly, unknown, CreatePerson>(
    "create-contacts",
    (element) => {
      console.log("going to create person", element);
      return createPerson({
        ...element,
      });
    },
    {
      onSuccess: async (value) => {
        await reactQuery.invalidateQueries("persons").then(() => {
          push("/contacts/" + value._id);
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
        isLoading: true,
        action: createContact,
      }}
    >
      <EssentialFormSection />
    </FormLayout>
  );
};
