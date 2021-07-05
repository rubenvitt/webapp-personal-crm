import {
  CreatePerson,
  IdOnly,
  Person,
  PersonDetails,
  PersonPhone,
  UpdatePerson,
} from "../globals/interfaces";
import { Contact, Person as PersonModel } from "../models/Person";
import { FilterQuery, Types, UpdateWriteOpResult } from "mongoose";
import { Logger } from "../globals/logging";

export async function apiFindPersonDetailsFor(
  aPersonId: string
): Promise<PersonDetails> {
  try {
    return PersonModel.findById(Types.ObjectId(aPersonId)).populate([
      "contact.phone",
      "contact.mail",
    ]);
  } catch (e) {
    Logger.error("Unable to find person details for", aPersonId, e);
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
  const person = await PersonModel.findById(Types.ObjectId(aPersonId));
  return await person.deleteOne();
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

export async function apiAddPhoneForPerson(
  aPersonId: string,
  value: string
): Promise<UpdateWriteOpResult> {
  return await Contact.create(value).then((doc) => {
    return PersonModel.updateOne(
      {
        _id: Types.ObjectId(aPersonId),
      },
      {
        $addToSet: {
          "contact.phone": doc.id,
        },
      }
    );
  });
}

export async function apiUpdatePhoneForPerson(
  aPersonId: string,
  aPhoneId: string,
  aPhone: PersonPhone
): Promise<UpdateWriteOpResult> {
  Contact.updateOne(
    { _id: Types.ObjectId(aPhoneId) },
    {
      $set: aPhone,
    }
  );
  return await Contact.create(aPhoneId).then((doc) => {
    return PersonModel.updateOne(
      {
        _id: Types.ObjectId(aPersonId),
      },
      {
        $addToSet: {
          "contact.phone": doc.id,
        },
      }
    );
  });
}

export async function apiDeletePhoneForPerson(
  aPersonId: string,
  aPhoneId: string
): Promise<{ deletedCount?: number }> {
  const any = await Contact.deleteOne({ _id: Types.ObjectId(aPhoneId) });
  await PersonModel.updateOne(
    { _id: Types.ObjectId(aPersonId) },
    {
      $pull: {
        "contact.phone": Types.ObjectId(aPhoneId),
      },
    }
  );
  return any;
}

export async function apiAddMailForPerson(
  aPersonId: string,
  value: string
): Promise<UpdateWriteOpResult> {
  return await Contact.create(value).then((doc) => {
    return PersonModel.updateOne(
      {
        _id: Types.ObjectId(aPersonId),
      },
      {
        $addToSet: {
          "contact.mail": doc.id,
        },
      }
    );
  });
}

export async function apiDeleteMailForPerson(
  aPersonId: string,
  aMailId: string
): Promise<{ deletedCount?: number }> {
  const any = await Contact.deleteOne({ _id: Types.ObjectId(aMailId) });
  await PersonModel.updateOne(
    { _id: Types.ObjectId(aPersonId) },
    {
      $pull: {
        "contact.mail": Types.ObjectId(aMailId),
      },
    }
  );
  return any;
}
