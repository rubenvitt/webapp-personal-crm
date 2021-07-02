// noinspection DuplicatedCode

import { EditPersonForm } from "../../../components/contacts/detail/edit/edit-form.component";
import { usePerson } from "../../../services/person-service";
import { apiFindAllPersons } from "../../../api-functions/persons";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
  const people = await apiFindAllPersons();
  return {
    paths:
      people?.map((value) => ({
        params: {
          id: value._id,
        },
      })) ?? [],
    fallback: true,
  };
}

const EditPersonPage: React.ReactNode = ({ id }) => {
  const { person, isLoading } = usePerson(id);
  return <>{isLoading ? <>Loading</> : <EditPersonForm person={person} />}</>;
};

export default EditPersonPage;
