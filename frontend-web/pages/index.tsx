import { useQuery } from "react-query";
import { findAllPersons } from "../services/person-service";
import { getCurrentUser } from "../services/account-service";

const Dashboard: React.FC = () => {
  const { data: persons } = useQuery("persons", findAllPersons);
  const { data: currentUser } = useQuery("user", getCurrentUser);

  return (
    <>
      <p>Hallo {currentUser?.name}!</p>
      <ul>
        <li>Overview last contacts</li>
        <li>Overview appointments</li>
        <li>Search?</li>
      </ul>

      <dl>{persons && <dt>Du hast {persons.length} Kontakte</dt>}</dl>
    </>
  );
};
export default Dashboard;
