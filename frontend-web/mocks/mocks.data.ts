import {
  AddressType,
  Anrede,
  MailType,
  PersonDetails,
  PhoneType,
} from "../globals/interfaces";

export const mockPersons: PersonDetails[] = [
  {
    id: "001-test",
    displayName: "Jane Cooper",
    isFavorite: true,
    primaryMail: {
      id: "001-test-mail01",
      value: "janecooper@primary.example.com",
      type: MailType.PRIVATE,
    },
    mails: [
      {
        id: "001-test-mail01",
        value: "janecooper@primary.example.com",
        type: MailType.PRIVATE,
      },
      {
        id: "001-test-mail02",
        value: "janecooper@not-primary.example.com",
        type: MailType.WORK,
      },
    ],
    primaryPhone: {
      id: "001-test-phone01",
      type: PhoneType.MOBILE_PRIVATE,
      value: "+49123321123",
    },
    phones: [
      {
        id: "001-test-phone01",
        type: PhoneType.MOBILE_PRIVATE,
        value: "+49123321123",
      },
      {
        id: "001-test-phone02",
        type: PhoneType.MOBILE_WORK,
        value: "+4912371235612",
      },
    ],
    addresses: [
      {
        id: "001-test-address01",
        type: AddressType.PRIVATE,
        value: {
          city: "Test City",
          country: "Test country",
          zip: "123231",
          street: "Test street",
        },
      },
      {
        id: "001-test-address02",
        type: AddressType.PRIVATE,
        value: {
          city: "Test City",
          country: "Test country",
          zip: "123231",
          street: "Test street",
        },
      },
    ],
    //imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
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
    displayName: "Jane Cooper " + new Date(),
    primaryMail: {
      id: "002-test-mail01",
      value: "janecooper@primary.example.com",
      type: MailType.PRIVATE,
    },
    isFavorite: false,
    mails: [
      {
        id: "002-test-mail01",
        value: "janecooper@primary.example.com",
        type: MailType.PRIVATE,
      },
      {
        id: "002-test-mail02",
        value: "janecooper@not-primary.example.com",
        type: MailType.WORK,
      },
    ],
    primaryPhone: {
      id: "002-test-phone01",
      type: PhoneType.MOBILE_PRIVATE,
      value: "+49123321123",
    },
    phones: [
      {
        id: "002-test-phone01",
        type: PhoneType.MOBILE_PRIVATE,
        value: "+49123321123",
      },
      {
        id: "002-test-phone02",
        type: PhoneType.MOBILE_WORK,
        value: "+4912371235612",
      },
    ],
    addresses: [
      {
        id: "002-test-address01",
        type: AddressType.PRIVATE,
        value: {
          city: "Test City",
          country: "Test country",
          zip: "123231",
          street: "Test street",
        },
      },
      {
        id: "002-test-address02",
        type: AddressType.PRIVATE,
        value: {
          city: "Test City",
          country: "Test country",
          zip: "123231",
          street: "Test street",
        },
      },
    ],
    //imageUrl: "https://randomuser.me/api/portraits/women/11.jpg",
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
