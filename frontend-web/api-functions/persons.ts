import {
  CreatePerson,
  IdOnly,
  Person,
  PersonDetails,
  UpdatePerson,
} from "../globals/interfaces";
import { Person as PersonModel } from "../models/Person";
import { FilterQuery, Types, UpdateWriteOpResult } from "mongoose";

export async function apiFindPersonDetailsFor(
  aPersonId: string
): Promise<PersonDetails> {
  try {
    return PersonModel.findById(Types.ObjectId(aPersonId));
  } catch (e) {
    console.log("error", e);
    return null;
  }
}

export async function apiFindAllPersons(
  filter?: FilterQuery<typeof PersonModel>
): Promise<Person[]> {
  return PersonModel.find(filter, { displayName: 1 });
}

export async function apiCreatePerson(aPerson: CreatePerson): Promise<IdOnly> {
  return await PersonModel.create(aPerson);
}

export async function apiUpdatePerson(
  aPerson: UpdatePerson
): Promise<UpdateWriteOpResult> {
  return PersonModel.updateOne(
    { _id: Types.ObjectId(aPerson._id) },
    {
      $set: aPerson,
    }
  );
}

export async function apiDeletePerson(
  aPersonId: string
): Promise<{ deletedCount?: number }> {
  return PersonModel.deleteOne({ _id: Types.ObjectId(aPersonId) });
}

export async function apiFavoritePerson(
  aPersonId: string,
  favorite: boolean
): Promise<UpdateWriteOpResult> {
  return PersonModel.updateOne(
    { _id: Types.ObjectId(aPersonId) },
    {
      $set: {
        isFavorite: favorite,
      },
    }
  );
}
