import { UserGroupIcon } from "@heroicons/react/outline";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { Person } from "../../globals/interfaces";
import { PersonListItem } from "../../components/contacts/person-list-item.component";

const people: Person[] = [
  {
    id: "001-test",
    name: "Jane Cooper",
    email: "janecooper@example.com",
    phone: "+49123321123",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    notification: "Geburtstag in 10 Tagen",
  },
  {
    id: "002-test",
    name: "Jane Cooper",
    email: "janecooper@example.com",
    phone: "+49123321123",
    imageUrl: "https://randomuser.me/api/portraits/women/11.jpg",
  },
];

export default function Index() {
  return (
    <div className="">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => (
          <PersonListItem key={person.email} person={person} />
        ))}
      </ul>
    </div>
  );
}
