import "dotenv/config";
import { MongoClient } from "mongodb";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db("portfolio");           // <- choose DB here
  const col = db.collection("fuelEntries");       // <- target collection

  const file = path.join(__dirname, "../data/projects.json");
  const json = JSON.parse(await readFile(file, "utf8"));
  if (!Array.isArray(json)) throw new Error("JSON must be an array");

  const res = await col.insertMany(json, { ordered: false });
  console.log(`Inserted ${res.insertedCount} docs into portfolio.fuelEntries`);
}
main().finally(() => client.close());
