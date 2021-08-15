// noinspection JSUnusedGlobalSymbols

import mongoose, { Date, Types } from "mongoose";
import { Logger } from "../global/logging";

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
  nickName: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
  },
  contact: {
    phone: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    },
    mail: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    },
    address: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

PersonSchema.pre("deleteOne", { document: true }, async function () {
  Logger.log("deleting following element:", this);
  if (
    this["contact"]?.phone?.length > 0 ||
    this["contact"]?.mail?.length > 0 ||
    this["contact"]?.address?.length > 0
  ) {
    await Contact.deleteMany({
      _id: {
        $in: [
          ...this["contact"]?.phone.map((v) => Types.ObjectId(v)),
          ...this["contact"]?.mail.map((v) => Types.ObjectId(v)),
          ...this["contact"]?.address.map((v) => Types.ObjectId(v)),
        ],
      },
    });
  }
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

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
});

export const Contact =
  mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema, "contacts");

export const Comment =
  mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema, "comments");

export const Person =
  mongoose.models.Person || mongoose.model("Person", PersonSchema, "persons");
