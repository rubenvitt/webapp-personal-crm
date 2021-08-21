import { useRouter } from "next/router";
import { TextInput } from "../../../components/elements/common/input.component";
import { SelectInput } from "../../../components/elements/common/select.input.component";
import { FormLayout } from "../../../components/modules/common/form/form.layout.component";
import { FormSection } from "../../../components/modules/common/form/section.component";
import { withPageAuthRequired } from "../../../config/auth0";
import { usePersons } from "../../../services/person-service";

export const getServerSideProps = withPageAuthRequired();

export default function NewActivity(): JSX.Element {
  const { query } = useRouter();
  if (query.person) {
    // person available, prefill select
  }

  const { persons, isLoading } = usePersons();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <FormLayout>
        <FormSection title="Person" description={"Person auswählen"}>
          <SelectInput
            title={"Person auswählen"}
            id={"person"}
            initialValue={query.person as string}
            onChange={() => undefined}
          >
            <>
              {persons?.map((person) => {
                return (
                  <option key={person._id} value={person._id}>
                    {person.displayName}
                  </option>
                );
              })}
            </>
          </SelectInput>
          <TextInput
            change={() => undefined}
            title={"Was habt ihr gemacht?"}
            label={"Was habt ihr gemacht?"}
          />
        </FormSection>
      </FormLayout>
    </>
  );
}
