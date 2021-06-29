import {
  CreatePerson,
  IdOnly,
  Person,
  PersonDetails,
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
