import { Anrede, Person, PersonDetails } from "../globals/interfaces";

const mockPersons: PersonDetails[] = [
  {
    id: "001-test",
    name: "Jane Cooper",
    email: "janecooper@example.com",
    phone: "+49123321123",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    notification: "Geburtstag in 10 Tagen",
    anrede: Anrede.FEMININE,
    birthday: "1997-04-03",
    lastContact: "2021-05-29",
    groups: [
      { color: { bg: "#c9066d", text: "#fff" }, title: "Family", id: "1" },
      { color: { bg: "#f38674", text: "#fff" }, title: "Friends", id: "2" },
      { color: { bg: "#2dd0cb", text: "#fff" }, title: "Coworker", id: "3" },
      { color: { bg: "#749cf3", text: "#fff" }, title: "Bestie", id: "4" },
      { color: { bg: "#e2f374", text: "#333" }, title: "Girlfriends", id: "5" },
      { color: { bg: "#e274f3", text: "#fff" }, title: "Girls", id: "6" },
    ],
  },
  {
    id: "002-test",
    name: "Jane Cooper " + new Date(),
    email: "janecooper@example.com",
    phone: "+49123321123",
    imageUrl: "https://randomuser.me/api/portraits/women/11.jpg",
    anrede: Anrede.FEMININE,
    birthday: "1981-11-13",
    lastContact: "2020-05-29",
    groups: [
      { color: { bg: "#c9066d", text: "#fff" }, title: "Family", id: "1" },
      { color: { bg: "#f38674", text: "#fff" }, title: "Friends", id: "2" },
      { color: { bg: "#2dd0cb", text: "#fff" }, title: "Coworker", id: "3" },
      { color: { bg: "#749cf3", text: "#fff" }, title: "Bestie", id: "4" },
      { color: { bg: "#e2f374", text: "#fff" }, title: "Girlfriends", id: "5" },
      { color: { bg: "#e274f3", text: "#fff" }, title: "Girls", id: "6" },
    ],
  },
];

export const findAllPersons: () => Promise<Person[]> = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPersons);
    }, 100);
  });
};

export const findDetailsFor: (aPersonId: string) => Promise<PersonDetails> =
  async (aPersonId: string) => {
    return mockPersons.find((elem) => elem.id === aPersonId);
  };
