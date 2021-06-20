import { CreatePerson } from "../globals/interfaces";
import { Person as PersonModel } from "../models/Person";

export async function apiFindPersonDetailsFor(aPersonId: string) {
  return PersonModel.findOne({
    _id: aPersonId,
  });
}

export function apiFindAllPersons() {
  return PersonModel.find({});
}

export async function apiCreatePerson(aPerson: CreatePerson) {
  return await PersonModel.create(aPerson);
}
