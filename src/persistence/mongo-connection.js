import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // o tu Cosmos/Mongo Atlas
const client = new MongoClient(uri);
export async function connect() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    return client.db("ping-pong");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
    throw err;
  }
}

// const db = client.db("ping-pong");
// const tasks = db.collection("tasks");

// const result = await tasks.find().toArray();
// console.log(result);
