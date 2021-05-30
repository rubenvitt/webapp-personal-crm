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
