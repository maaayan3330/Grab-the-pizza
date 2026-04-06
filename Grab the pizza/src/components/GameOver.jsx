export default function GameOver({ score, restartGame }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl border-4 border-amber-900 bg-gradient-to-br from-orange-300 via-orange-400 to-amber-500 px-6 py-6 text-center shadow-[0_15px_40px_rgba(120,53,15,0.45)] sm:px-10 sm:py-8">
        <h2 className="text-3xl font-extrabold text-amber-950 drop-shadow sm:text-4xl">
          Game Over
        </h2>

        <div>
          <p className="text-base text-amber-900 sm:text-lg">You grabbed</p>
          <p className="text-2xl font-bold text-amber-950 sm:text-3xl">
            {score} pizzas
          </p>
        </div>

        <button
          onClick={restartGame}
          className="mt-2 rounded-2xl border-2 border-amber-900 bg-amber-100 px-5 py-2 text-base font-bold text-amber-900 shadow-md transition hover:scale-105 hover:bg-amber-200 active:scale-95 sm:px-6 sm:text-lg"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}