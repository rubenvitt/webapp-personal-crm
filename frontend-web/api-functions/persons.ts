import { Types, UpdateWriteOpResult } from "mongoose";
import {
  CreateElement,
  CreatePerson,
  IdOnly,
  Person,
  PersonAddress,
  PersonDetails,
  PersonMail,
  PersonPhone,
  UpdatePerson,
} from "../global/interfaces";
import { Logger } from "../global/logging";
import { Comment, Contact, Person as PersonModel } from "../models/Person";

export async function apiFindPersonDetailsFor(
  aPersonId: string
): Promise<PersonDetails> {
  try {
    return PersonModel.findById(Types.ObjectId(aPersonId)).populate([
      "contact.phone",
      "contact.mail",
      "contact.address",
      "comments",
    ]);
  } catch (e) {
    Logger.error("Unable to find person details for", aPersonId, e);
    return null;
  }
}

export function apiFindAllPersons(filter?: {
  isFavorite?: boolean;
}): Promise<Person[]> {
  return PersonModel.find(filter, { displayName: 1 });
}

export async function apiCreatePerson(aPerson: CreatePerson): Promise<IdOnly> {
  return await PersonModel.create(aPerson);
}

export async function apiUpdatePerson(
  aPerson: UpdatePerson
): Promise<UpdateWriteOpResult> {
  Logger.log("Setting", aPerson);
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

export async function apiAddCommentForPerson(
  aPersonId: string,
  comment: CreateElement<Comment>
) {
  return await Comment.create(comment).then((doc) => {
    return PersonModel.updateOne(
      {
        _id: Types.ObjectId(aPersonId),
      },
      {
        $addToSet: {
          comments: doc.id,
        },
      }
    );
  });
}

export async function apiAddPhoneForPerson(
  aPersonId: string,
  value: Omit<PersonPhone, "_id">
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
  return Contact.updateOne(
    { _id: Types.ObjectId(aPhoneId) },
    {
      $set: aPhone,
    }
  );
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
  value: Omit<PersonMail, "_id">
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

export async function apiUpdateMailForPerson(
  aPersonId: string,
  aMailId: string,
  aMail: PersonMail
): Promise<UpdateWriteOpResult> {
  return Contact.updateOne(
    { _id: Types.ObjectId(aMailId) },
    {
      $set: aMail,
    }
  );
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

export async function apiAddAddressForPerson(
  aPersonId: string,
  value: Omit<PersonAddress, "_id">
): Promise<UpdateWriteOpResult> {
  return await Contact.create(value).then((doc) => {
    return PersonModel.updateOne(
      {
        _id: Types.ObjectId(aPersonId),
      },
      {
        $addToSet: {
          "contact.address": doc.id,
        },
      }
    );
  });
}

export async function apiUpdateAddressForPerson(
  aPersonId: string,
  anAddressId: string,
  anAddress: PersonAddress
): Promise<UpdateWriteOpResult> {
  return Contact.updateOne(
    { _id: Types.ObjectId(anAddressId) },
    {
      $set: anAddress,
    }
  );
}

export async function apiDeleteAddressForPerson(
  aPersonId: string,
  anAddressId: string
): Promise<{ deletedCount?: number }> {
  const any = await Contact.deleteOne({ _id: Types.ObjectId(anAddressId) });
  await PersonModel.updateOne(
    {
      _id: Types.ObjectId(aPersonId),
    },
    {
      $pull: {
        "contact.address": Types.ObjectId(anAddressId),
      },
    }
  );
  return any;
}
