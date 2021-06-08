import { Person, PersonDetails } from "../globals/interfaces";
import axios from "../axios";

export const findAllPersons: () => Promise<Person[]> = async () => {
  return axios.get("/api/persons").then((value) => value.data);
};

export const findAllFavoritePersons: () => Promise<Person[]> = async () => {
  return axios.get("/api/persons?filter=favorites").then((value) => value.data);
};

export const findDetailsFor: (aPersonId: string) => Promise<PersonDetails> = (
  aPersonId
) => axios.get("/api/persons/" + aPersonId).then((value) => value.data);
