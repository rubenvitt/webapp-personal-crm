import mongoose from "mongoose";
import { apiMongoUrl } from "../global/constants";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    cached.promise = mongoose.connect(apiMongoUrl, opts).then((mongoose) => {
      mongoose.set("debug", true);
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
