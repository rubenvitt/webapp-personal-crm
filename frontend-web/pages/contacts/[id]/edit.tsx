// noinspection DuplicatedCode

import { EditPersonForm } from "../../../components/contacts/detail/edit/edit-form.component";
import { usePerson } from "../../../services/person-service";

const EditPersonPage: React.ReactNode = ({ id }) => {
  const { person, isLoading } = usePerson(id);
  return <>{isLoading ? <>Loading</> : <EditPersonForm person={person} />}</>;
};

export default EditPersonPage;
