import { connectDB } from "./lib/db";
import mongoose from "mongoose";
import PageClient from "./page.client";

const FuelEntrySchema = new mongoose.Schema(
  {
    odometer: Number,
    comments: String,
  },
  { collection: "fuelEntries" }
);

const FuelEntry =
  mongoose.models.FuelEntry || mongoose.model("FuelEntry", FuelEntrySchema);

export default async function PageServer() {
  await connectDB();

  const LIMIT = 7;
  const entries = await FuelEntry.find({})
    .sort({ odometer: -1 })
    .limit(LIMIT)
    .lean();

  const plainEntries = entries.map((e) => ({
    ...e,
    _id: e._id.toString(),
  }));

  console.log("Fetched entries:", entries);

  return <PageClient items={plainEntries} avgKmPerL={0} nextDate={null} />;
}
