import { PersonListItem } from "../../components/contacts/person-list-item.component";
import { useQuery } from "react-query";
import { findAllPersons } from "../../services/user-service";

export default function Index() {
  const { data: persons, isLoading } = useQuery("persons", findAllPersons);
  return (
    <div className="">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading && "Loading"}
        {persons &&
          persons.map((person) => (
            <PersonListItem key={person.id} person={person} />
          ))}
      </ul>
    </div>
  );
}
