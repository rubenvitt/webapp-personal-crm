import {
  CreatePerson,
  IdOnly,
  Person,
  PersonDetails,
} from "../globals/interfaces";
import axios from "../axios";

export const findAllPersons: () => Promise<Person[]> = async () => {
  return axios
    .get("/api/persons")
    .then((value) => value.data)
    .catch(() => undefined);
};

export const findAllFavoritePersons: () => Promise<Person[]> = async () => {
  return axios
    .get("/api/persons?filter=favorites")
    .then((value) => value.data)
    .catch(() => undefined);
};

export const findDetailsFor: (aPersonId: string) => Promise<PersonDetails> = (
  aPersonId
) => axios.get("/api/persons/" + aPersonId).then((value) => value.data);

export const createPerson: (aPerson: CreatePerson) => Promise<IdOnly> = async (
  aPerson
) => {
  return axios
    .post<IdOnly>("/api/persons/create", aPerson)
    .then((value) => value.data)
    .catch(() => undefined);
};
