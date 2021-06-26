import { CreatePerson } from "../globals/interfaces";
import {
  Person as PersonModel,
  PersonCreate as PersonCreateModel,
} from "../models/Person";
import { Types } from "mongoose";

export async function apiFindPersonDetailsFor(aPersonId: string) {
  try {
    return PersonModel.findById(Types.ObjectId(aPersonId));
  } catch (e) {
    console.log("error", e);
    return null;
  }
}

export function apiFindAllPersons() {
  return PersonModel.find({}, { displayName: 1 });
}

export async function apiCreatePerson(aPerson: CreatePerson) {
  return await PersonCreateModel.create(aPerson);
}
