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
});

export const Person =
  mongoose.models.Person || mongoose.model("Person", PersonSchema, "persons");
