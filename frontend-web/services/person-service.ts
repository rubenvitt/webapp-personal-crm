import {
  CreatePerson,
  IdOnly,
  Person,
  PersonDetails,
  PersonPhone,
  UpdatePerson,
} from "../globals/interfaces";
import axios from "../axios";

export const findAllPersons: () => Promise<Person[]> = async () => {
  return axios
    .get("/persons")
    .then((value) => value.data)
    .catch(() => undefined);
};

export const findAllFavoritePersons: () => Promise<Person[]> = async () => {
  return axios
    .get("/persons?filter=favorites")
    .then((value) => value.data)
    .catch(() => undefined);
};

export const findDetailsFor: (aPersonId: string) => Promise<PersonDetails> = (
  aPersonId
) => axios.get("/persons/" + aPersonId).then((value) => value.data);

export const createPerson: (aPerson: CreatePerson) => Promise<IdOnly> = async (
  aPerson
) => {
  return axios
    .post<IdOnly>("/persons/create", aPerson)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const updatePerson: (aPerson: UpdatePerson) => Promise<void> = async (
  aPerson
) => {
  return axios
    .put<IdOnly>("/persons/" + aPerson._id, aPerson)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const deletePerson: (aPerson: IdOnly) => Promise<void> = async (
  aPerson
) => {
  return axios
    .delete<void>("/persons/" + aPerson._id)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const favoritePerson: (
  aPerson: IdOnly,
  state: boolean
) => Promise<void> = async (aPerson, state) => {
  return axios
    .post<void>("/persons/" + aPerson._id + "/favorite", {
      status: state,
    })
    .then((value) => value.data)
    .catch(() => undefined);
};

export const addPhoneNumber: (
  aPerson: IdOnly,
  phone: Omit<PersonPhone, "_id">
) => Promise<void> = async (aPerson, phone) => {
  return axios
    .post<void>("/persons/" + aPerson._id + "/contact/phone/add", phone)
    .then((value) => value.data)
    .catch(() => undefined);
};

export const deletePhoneNumber: (
  aPersonId: IdOnly,
  aPhoneID: IdOnly
) => Promise<void> = async ({ _id: aPerson }, { _id: aPhone }) => {
  return axios
    .delete<void>("/persons/" + aPerson + "/contact/phone/" + aPhone)
    .then((value) => value.data)
    .catch(() => undefined);
};
