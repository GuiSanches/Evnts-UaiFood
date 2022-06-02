import { Db, MongoClient, ServerApiVersion } from "mongodb";
require('dotenv').config();

const URI = process.env.MONGO_DB_URL || '';
const PASSWORD = process.env.PASSWORD || '';

const connectDB = async (dbName: string, Query: (db : Db) => Promise<void>) => {
    try {
        const client = new MongoClient(URI.replace('<password>', PASSWORD), {
            serverApi: ServerApiVersion.v1
        });

        client.connect(async err => {
            const db = client.db(dbName);

            await Query(db);

            client.close();
        })

    }catch(e: any) {
        console.error(e.message);
    }
}

export default connectDB;

