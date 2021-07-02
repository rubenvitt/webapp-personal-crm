// noinspection DuplicatedCode

import { EditPersonForm } from "../../../components/contacts/detail/edit/edit-form.component";
import { URL_API_Persons } from "../../../globals/urls";
import { fetcher } from "../../../globals/swr.utils";
import { Person } from "../../../globals/interfaces";
import { usePerson } from "../../../services/person-service";

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
  const people = await fetcher<Person[]>(URL_API_Persons);
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
