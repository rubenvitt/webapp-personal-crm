// noinspection DuplicatedCode

import { EditPersonForm } from "../../../components/contacts/detail/edit/edit-form.component";
import { usePerson } from "../../../services/person-service";
import { withPageAuthRequired } from "../../../globals/auth0";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    return {
      props: {
        id: context.params.id,
      },
    };
  },
});

const EditPersonPage: React.ReactNode = ({ id }) => {
  const { person, isLoading } = usePerson(id);
  return (
    <>
      {isLoading || !person ? <>Loading</> : <EditPersonForm person={person} />}
    </>
  );
};

export default EditPersonPage;
