import mongoose from "mongoose";

const PersonCreateSchema = new mongoose.Schema({
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
    required: [true, "Bitte gebe ein Geschlecht für die Person an"],
  },
  firstName: {
    type: String,
  },
  familyName: {
    type: String,
  },
});

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

export const PersonCreate =
  mongoose.models.PersonCreate ||
  mongoose.model("PersonCreate", PersonCreateSchema, "persons");

export const Person =
  mongoose.models.Person || mongoose.model("Person", PersonSchema, "persons");

export const PersonDetails =
  mongoose.models.PersonDetails ||
  mongoose.model("PersonDetails", PersonDetailsSchema, "persons");
