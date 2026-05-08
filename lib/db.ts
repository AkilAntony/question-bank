import { MongoClient } from "mongodb";

const uri = process.env.DB_URL;
const options = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!uri) {
  if (typeof window === "undefined") {
    console.warn("DB_URL is not set. Database features will be unavailable.");
  }
}

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
      client = new MongoClient(uri, options);
      (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;

export async function getDb() {
  if (!clientPromise) {
    throw new Error("DB_URL is not configured");
  }
  const client = await clientPromise;
  return client.db("question-bank");
}
