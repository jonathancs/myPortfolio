"use client";

type Entry = {
  _id?: string;
  odometer?: number;
  comments?: string;
};

export default function FuelWidget({
  items,
  avgKMperTank,
  avgKMperLiter,
  nextKMFuel,
}: {
  items: Entry[];
  avgKMperTank: number;
  avgKMperLiter: number;
  nextKMFuel: number;
}) {
  return (
    <div className="mt-20 inset-0 flex justify-center items-center">
      {/* back layers */}
      <div className="absolute w-[350px] h-[400px] translate-x-6 -translate-y-8 rounded-xl border-4 border-orange-900 bg-orange-300 z-0" />
      <div className="absolute w-[350px] h-[400px] translate-x-3 -translate-y-4 rounded-xl border-4 border-orange-900 bg-orange-200 z-10" />

      {/* main window */}
      <div className="relative w-[350px] h-[400px] rounded-xl border-4 border-orange-900 bg-orange-100 p-4 text-black shadow-[5px_5px_0_rgba(0,0,0,0.55)] z-20">
        <div className="flex items-center justify-between rounded-t-md mb-2 px-3 py-1 bg-orange-400 border-b-4 border-orange-900">
          <span className="text-sm font-bold">Fuel Calculator</span>
          <button aria-label="Close" className="text-sm font-bold">✕</button>
        </div>

        <ul className="space-y-1 max-h-[260px] overflow-auto pr-1">
          {items.map((e, i) => (
            <li key={i} className="border-b border-orange-900/30 pb-1">
              <span className="font-semibold">{e.odometer ?? "—"}</span> km
            </li>
          ))}
        </ul>

        <p className="mt-2 text-sm font-bold">Average per tank: {avgKMperTank} km/L</p>
        <p className="mt-1 text-sm font-bold">Average per litter: {avgKMperLiter} km/L</p>
        <p className="mt-1 text-sm font-bold">Next Km fuel: {nextKMFuel ?? "—"}</p>
      </div>
    </div>
  );
}
