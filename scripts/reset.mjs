// scripts/reset.mjs
import "dotenv/config";
import { MongoClient } from "mongodb";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

const dbName = args.db || process.env.MONGODB_DB || "portfolio";
const collection = args.collection || args.col;
const fileArg = args.file || args.f;

if (!collection) throw new Error("Missing --collection");
if (!fileArg) throw new Error("Missing --file (path to JSON array)");

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection(collection);

  const filePath = path.isAbsolute(fileArg) ? fileArg : path.join(__dirname, "..", fileArg);
  const jsonText = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(jsonText);
  if (!Array.isArray(data)) throw new Error("JSON must be an array of documents");

  const del = await col.deleteMany({});
  console.log(`Deleted ${del.deletedCount} docs from ${dbName}.${collection}`);

  if (data.length) {
    const res = await col.insertMany(data, { ordered: false });
    console.log(`Inserted ${res.insertedCount} docs into ${dbName}.${collection}`);
  } else {
    console.log("Input array is empty; nothing inserted.");
  }
}
main().finally(() => client.close());
