import mongoose from "mongoose";

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

export const Contact =
  mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema, "contacts");

export const Person =
  mongoose.models.Person || mongoose.model("Person", PersonSchema, "persons");
