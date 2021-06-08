import nextConnect from "next-connect";
import dbConnect from "../../../api-functions/dbConnect";
import { Person } from "../../../models/Person";

const handler = nextConnect();
handler.get(async (req, res) => {
  await dbConnect();

  const persons = await Person.find({});
  res.json(persons);
});

export default handler;
