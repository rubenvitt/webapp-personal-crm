import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "Bitte gebe einen Namen für die Person an"],
  },
});

const PersonDetailsSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "Bitte gebe einen Namen für die Person an"],
  },
  age: {
    type: String,
  },
});

export const Person =
  mongoose.models.Person || mongoose.model("Person", PersonSchema, "persons");

export const PersonDetails =
  mongoose.models.PersonDetails ||
  mongoose.model("PersonDetails", PersonDetailsSchema, "persons");
