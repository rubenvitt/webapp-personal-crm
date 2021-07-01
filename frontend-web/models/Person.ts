import mongoose, { Types } from "mongoose";

const PersonSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "Bitte gebe einen Namen für die Person an"],
  },
  gender: {
    type: String,
    required: false,
  },
  anrede: {
    type: String,
    required: true,
  },
  birthday: {
    dateType: {
      type: String,
      enum: ["MONTH_DAY", "MONTH", "UNKNOWN", "EXACT", "AGE"],
      required: true,
    },
    dateValue: {
      type: String,
      required: false,
    },
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
  },
  contact: {
    phone: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    },
  },
});

PersonSchema.pre("deleteOne", { document: true }, async function (next) {
  console.log("deleting following element:", this);
  await Contact.deleteMany({
    _id: {
      $in: this["contact"]?.phone.map((v) => Types.ObjectId(v)),
    },
  });
});

const ContactSchema = new mongoose.Schema({
  value: {
    type: Object,
  },
  customType: {
    type: String,
    required: false,
  },
  type: {
    type: Number,
  },
});

async function removeLinkedContact(next: () => void) {
  console.log("should remove contact for doc", this);

  const result = await Contact.remove({
    _id: {
      $in: this["contact"]?.phone,
    },
  });
  console.log("finished removing with result", result);
}

export const Contact =
  mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema, "contacts");

export const Person =
  mongoose.models.Person || mongoose.model("Person", PersonSchema, "persons");
