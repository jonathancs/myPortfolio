import { connectDB } from "./lib/db";
import mongoose from "mongoose";
import PageClient from "./page.client";

// Define schema/model only if not already registered
const FuelEntrySchema = new mongoose.Schema(
  {
    date: Date,
    liters: Number,
    kilometers: Number,
    cost: Number,
  },
  { collection: "fuelEntries" }
);

const FuelEntry =
  mongoose.models.FuelEntry || mongoose.model("FuelEntry", FuelEntrySchema);

export default async function PageServer() {
  await connectDB();

  // Fetch from your fuelEntries collection
  const entries = await FuelEntry.find().sort({ date: -1 }).lean();

  return <PageClient items={entries} />;
}
