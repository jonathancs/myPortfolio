"use client";
import { useState } from "react";
import FuelWidget from "./components/FuelWidget";

type Entry = {
  _id?: string;
  odometer?: number;
  comments?: string;
};

export default function PageClient({
  items,
  avgKMperTank,
  avgKMperLiter,
  nextKMFuel
}: {
  items: Entry[];
  avgKMperTank: number;
  avgKMperLiter: number;
  nextKMFuel: number;
}) {
  // keep any other UI state you want here
  const [dummy, setDummy] = useState(0);
  console.log(items)

  return (
    <main>
      <div>
        {/* linktree wrapper (unchanged) */}
        <div className="pt-24 pb-24 max-w-md mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
            <p>Oi, bem-vindo 🙂</p>
            <button className="text-sm" onClick={() => setDummy((d) => d + 1)}>
              X
            </button>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <img
              src="/avatar.png"
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <h1 className="text-2xl font-bold">Jonathan Casagrande</h1>
            <p className="text-gray-600">Programador</p>
          </div>

          <div className="flex flex-col space-y-3">
            <a
              className="inline-block no-underline bg-gray-200 px-4 py-2 rounded-md text-center"
              href="https://wa.me/5551980120850"
            >
              Whatsapp
            </a>
            <a
              className="inline-block no-underline bg-gray-200 px-4 py-2 rounded-md text-center"
              href="https://instagram.com/casagrandejs"
            >
              Instagram
            </a>
            <a
              className="inline-block no-underline bg-gray-200 px-4 py-2 rounded-md text-center"
              href="https://www.linkedin.com/in/jonathancasagrande/"
            >
              Linkedin
            </a>
          </div>
        </div>

        <FuelWidget 
          items={items} 
          avgKMperTank={avgKMperTank} 
          avgKMperLiter={avgKMperLiter} 
          nextKMFuel={nextKMFuel}
        />
        
      </div>
    </main>
  );
}