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

  const n = plainEntries.length
  const avgKMperTank = Math.floor( (plainEntries[0].odometer - plainEntries[n-1].odometer) / (n-1) )
  const avgKMperLiter = Math.floor(avgKMperTank / 12 )
  const nextKMFuel = Math.floor(plainEntries[0].odometer + avgKMperTank)

  return <PageClient items={plainEntries} avgKMperLiter={avgKMperLiter} avgKMperTank={avgKMperTank} nextKMFuel={nextKMFuel} />;
}