"use client";
import { useState } from "react";

export default function PageClient({ items }: { items: any[] }) {
  const [average, setAverage] = useState("42 km");
  const [nextDate, setNextDate] = useState("2025-09-01");

  return (
    <main>
      <div>
        {/* linktree wrapper */}
        <div className="pt-24 pb-24 max-w-md mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
            <p>Oi, bem-vindo 🙂</p>
            <button className="text-sm">X</button>
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
          <div className="m-4 w-110 h-100 border border-2 border-red-500">
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="border-b pb-1">
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>

            <p className="mt-4 font-bold">Average: {average}</p>
            <p className="mt-4 font-bold">Next Date: {nextDate}</p>
          </div>

          <div className="m-4 w-110 h-100 border border-2 border-red-500"></div>
          <div className="m-4 w-110 h-100 border border-2 border-red-500"></div>
        </div>
      </div>
    </main>
  );
}
