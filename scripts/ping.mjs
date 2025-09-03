import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // load if you use .env.local
dotenv.config(); // fallback to .env

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("No MONGODB_URI found in env.");
  process.exit(1);
}

console.log("🔗 Using URI:", uri);

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1 },
  tls: true,
  tlsAllowInvalidCertificates: true,   // <— TEMP TEST
  tlsAllowInvalidHostnames: true       // <— TEMP TEST
});



try {
  await client.db("admin").command({ ping: 1 });
  console.log("✅ Ping OK");
} catch (e) {
  console.error("❌ Ping failed:", e);
} finally {
  await client.close();
}
