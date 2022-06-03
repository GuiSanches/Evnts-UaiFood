import { Db } from "mongodb";
import { client } from "../../app";
require("dotenv").config();

const connectDB = async (dbName: string, Query: (db: Db) => Promise<void>) => {
  try {
    const db = (await client.connect()).db(dbName);
    await Query(db);
    client.close();
  } catch (e: any) {
    throw new Error("Error on Query. Verify the database");
  }
  return;
};

export const initializeDB = async () => {
  try {
    const db = (await client.connect()).db("uaifood");

    await db
      .collection("restaurant")
      .createIndex({ name: 1 }, { unique: true });
    await db.collection("restaurant").createIndex({ location: "2dsphere" });
  } catch (e: any) {
    console.log(e.message);
  }
};

export default connectDB;
