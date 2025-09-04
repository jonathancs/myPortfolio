"use client";
import { useState } from "react";

type Entry = {
  _id?: string;
  date?: string | Date;
  liters?: number;
  kilometers?: number;
  cost?: number;
};

export default function PageClient({
  items,
  avgKmPerL,
  nextDate,
}: {
  items: Entry[];
  avgKmPerL: number;
  nextDate: string | null;
}) {
  // keep any other UI state you want here
  const [dummy, setDummy] = useState(0);

  return (
    <main>
      <div>
        {/* linktree wrapper (unchanged) */}
        <div className="pt-24 pb-24 max-w-md mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
            <p>Oi, bem-vindo 🙂</p>
            <button className="text-sm" onClick={() => setDummy((d) => d + 1)}>X</button>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <img src="/avatar.png" alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
            <h1 className="text-2xl font-bold">Jonathan Casagrande</h1>
            <p className="text-gray-600">Programador</p>
          </div>

          <div className="flex flex-col space-y-3">
            <a className="inline-block no-underline bg-gray-200 px-4 py-2 rounded-md text-center" href="https://wa.me/5551980120850">Whatsapp</a>
            <a className="inline-block no-underline bg-gray-200 px-4 py-2 rounded-md text-center" href="https://instagram.com/casagrandejs">Instagram</a>
            <a className="inline-block no-underline bg-gray-200 px-4 py-2 rounded-md text-center" href="https://www.linkedin.com/in/jonathancasagrande/">Linkedin</a>
          </div>
        </div>

        {/* widgets wrapper */}
        <div className="bg-neutral-700 flex flex-wrap justify-center items-center p-10 gap-50">
          <div className="m-4 w-110 h-100 border border-2 border-red-500 p-4 text-white">
            <ul className="space-y-2">
              {items.map((e, i) => (
                <li key={i} className="border-b border-white/20 pb-1">
                  <span className="font-medium">
                    {e.date ? new Date(e.date).toISOString().slice(0,10) : "—"}
                  </span>
                  {" · "}
                  {e.kilometers ?? "—"} km
                  {" · "}
                  {e.liters ?? "—"} L
                  {typeof e.cost === "number" ? ` · R$ ${e.cost.toFixed(2)}` : ""}
                </li>
              ))}
            </ul>

            <p className="mt-4 font-bold">
              Average: {avgKmPerL} km/L
            </p>
            <p className="mt-4 font-bold">
              Next Date: {nextDate ?? "—"}
            </p>
          </div>

          <div className="m-4 w-110 h-100 border border-2 border-red-500"></div>
          <div className="m-4 w-110 h-100 border border-2 border-red-500"></div>
        </div>
      </div>
    </main>
  );
}
