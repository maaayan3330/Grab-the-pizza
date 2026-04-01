
export default function Header({score}) {
    return (
        <div className="flex justify-center pt-8 pb-4">
            <div className="rounded-3xl border-4 border-amber-900 bg-gradient-to-br from-orange-300 via-orange-400 to-amber-500 px-10 py-5 shadow-[0_10px_30px_rgba(120,53,15,0.35)]">
                <h1 className="text-5xl font-extrabold tracking-wide text-amber-950 drop-shadow-sm">
                    Grab the Pizza
                </h1>
                <p className="mt-2 text-center text-sm font-medium tracking-[0.2em] text-amber-900 uppercase">
                    Fresh • Hot • Fast
                </p>
                
            </div>
            <p>
                Score {score}
            </p>
        </div>
    );
}