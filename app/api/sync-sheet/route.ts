import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import Item from "@/app/models/Item";
import { connectDB } from "@/app/lib/db";

export async function GET() {
  await connectDB();
  const url = process.env.SHEET_CSV_URL!;
  const res = await fetch(url, { cache: "no-store" });
  const csv = await res.text();

  const rows = parse(csv, { columns: true, skip_empty_lines: true });
  // supondo colunas: id,name,value
  const ops = rows.map((r: any) => ({
    updateOne: {
      filter: { id: r.id },
      update: { $set: { name: r.name, value: r.value } },
      upsert: true,
    },
  }));
  if (ops.length) await Item.bulkWrite(ops);

  return NextResponse.json({ ok: true, upserts: ops.length });
}