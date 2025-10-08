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
    <div className="relative flex justify-center">
      {/* back layers */}
      <div className="absolute top-4 left-4 w-[22rem] h-[15rem] bg-orange-300 border-[4px] border-orange-900 rounded-xl z-0" />
      <div className="absolute top-2 left-2 w-[22rem] h-[15rem] bg-orange-200 border-[4px] border-orange-900 rounded-xl z-10" />

      {/* main window */}
      <div className="m-4 w-[22rem] h-[15rem] rounded-xl border-[4px] border-orange-900 bg-orange-100 p-5 text-black shadow-[8px_8px_0_rgba(0,0,0,0.55)] z-20">
        <div className="flex items-center justify-between rounded-t-md -mt-1 -mx-1 mb-3 px-3 py-1 bg-orange-400 border-b-4 border-orange-900">
          <span className="text-sm font-bold">Fuel Calculator</span>
          <button aria-label="Close" className="text-sm font-bold">
            ✕
          </button>
        </div>

        <ul className="space-y-2 max-h-[7.5rem] overflow-auto pr-1">
          {items.map((e, i) => (
            <li key={i} className="border-b border-orange-900/30 pb-1">
              <span className="font-semibold tabular-nums tracking-wide">
                {e.odometer ?? "—"}
              </span>{" "}
              km
            </li>
          ))}
        </ul>

        {/* stats */}
        <p className="mt-3 font-bold">Average per tank: {avgKMperTank} km/L</p>
        <p className="mt-1 font-bold">Average per litter: {avgKMperLiter} km/L</p>
        <p className="mt-1 font-bold">Next Km fuel: {nextKMFuel ?? "—"}</p>
      </div>
    </div>
  );
}
