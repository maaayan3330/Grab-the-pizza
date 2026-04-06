export default function Header({ score, timer }) {
  return (
    <div className="flex flex-col items-center gap-3 px-3 pt-4 pb-3 sm:pt-6 sm:pb-4">
      
      <div className="rounded-2xl border-4 border-amber-900 bg-gradient-to-br from-orange-300 via-orange-400 to-amber-500 px-4 py-3 shadow-[0_8px_20px_rgba(120,53,15,0.3)] sm:px-8 sm:py-4">
        <h1 className="text-center text-2xl font-extrabold tracking-wide text-amber-950 sm:text-4xl">
          Grab the Pizza
        </h1>

        <p className="mt-1 text-center text-[9px] uppercase tracking-[0.12em] text-amber-900 sm:text-xs">
          Fresh • Hot • Fast
        </p>
      </div>

      <div className="flex justify-center gap-2 sm:gap-4">
        <div className="flex min-w-[90px] flex-col items-center justify-center rounded-xl border-2 border-amber-800 bg-white/70 px-3 py-2 shadow backdrop-blur sm:min-w-[110px] sm:px-5 sm:py-3">
          <span className="text-[9px] uppercase tracking-widest text-amber-700 sm:text-xs">
            Score
          </span>
          <span className="text-lg font-bold text-amber-900 sm:text-2xl">
            {score}
          </span>
        </div>

        <div className="flex min-w-[90px] flex-col items-center justify-center rounded-xl border-2 border-amber-800 bg-white/70 px-3 py-2 shadow backdrop-blur sm:min-w-[110px] sm:px-5 sm:py-3">
          <span className="text-[9px] uppercase tracking-widest text-amber-700 sm:text-xs">
            Timer
          </span>
          <span className="text-lg font-bold text-amber-900 sm:text-2xl">
            {timer}
          </span>
        </div>
      </div>
    </div>
  );
}