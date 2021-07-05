// noinspection DuplicatedCode

import { EditPersonForm } from "../../../components/contacts/detail/edit/edit-form.component";
import { usePerson } from "../../../services/person-service";
import { withPageAuthRequired } from "../../../globals/auth0";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export const getServerSideProps = withPageAuthRequired();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

const EditPersonPage: React.ReactNode = ({ id }) => {
  const { person, isLoading } = usePerson(id);
  return <>{isLoading ? <>Loading</> : <EditPersonForm person={person} />}</>;
};

export default EditPersonPage;
