import { useState } from "react";

interface Props {
  onComplete: () => void;
}

const Candle = ({ lit, index }: { lit: boolean; index: number }) => (
  <div className="flex flex-col items-center mx-2">
    {/* Flame */}
    <div
      className="w-3 h-5 rounded-full mb-0.5 transition-all duration-500"
      style={{
        background: lit
          ? "radial-gradient(ellipse at bottom, hsl(45, 100%, 60%), hsl(30, 100%, 50%), hsl(15, 100%, 45%))"
          : "transparent",
        animation: lit ? `flame-flicker 0.4s ease-in-out infinite ${index * 0.1}s` : "flame-out 0.5s ease-out forwards",
        filter: lit ? "drop-shadow(0 0 6px hsl(45, 100%, 60%)) drop-shadow(0 0 12px hsl(30, 100%, 50%))" : "none",
      }}
    />
    {/* Wick */}
    <div className="w-0.5 h-2 bg-foreground/40 rounded-full" />
    {/* Candle body */}
    <div
      className="w-3 h-10 rounded-sm"
      style={{
        background: index % 2 === 0
          ? "linear-gradient(to bottom, hsl(var(--primary)), hsl(330, 70%, 55%))"
          : "linear-gradient(to bottom, hsl(var(--secondary)), hsl(270, 55%, 62%))",
      }}
    />
  </div>
);

const BirthdayCake = ({ onComplete }: Props) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blowing, setBlowing] = useState(false);

  const handleBlow = () => {
    if (blowing) return;
    setBlowing(true);
    setCandlesLit(false);

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-[fade-in_0.6s_ease-out]">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${10 + i * 12}%`,
              bottom: "-10%",
              animation: `float-heart ${6 + i * 1.5}s linear infinite ${i * 0.8}s`,
            }}
          >
            {["💖", "💗", "✨", "💝"][i % 4]}
          </span>
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl font-display text-gradient mb-8 text-center">
        🎂 Happy Birthday! 🎂
      </h1>

      {/* Cake */}
      <div className="relative mb-10">
        {/* Candles */}
        <div className="flex justify-center mb-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Candle key={i} lit={candlesLit} index={i} />
          ))}
        </div>

        {/* Cake layers */}
        <div className="flex flex-col items-center">
          {/* Top layer */}
          <div
            className="w-48 h-14 rounded-t-xl"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(330, 65%, 58%))",
              boxShadow: "inset 0 -4px 0 hsl(330, 60%, 50%)",
            }}
          >
            <div className="w-full h-3 rounded-t-xl" style={{ background: "hsl(45, 90%, 85%)" }} />
          </div>
          {/* Middle layer */}
          <div
            className="w-60 h-16 rounded-b-sm"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--secondary)), hsl(270, 50%, 65%))",
              boxShadow: "inset 0 -4px 0 hsl(270, 45%, 58%)",
            }}
          >
            <div className="w-full h-3" style={{ background: "hsl(45, 90%, 85%)" }} />
          </div>
          {/* Bottom layer */}
          <div
            className="w-72 h-18 rounded-b-xl"
            style={{
              background: "linear-gradient(to bottom, hsl(330, 60%, 72%), hsl(330, 55%, 62%))",
              boxShadow: "inset 0 -4px 0 hsl(330, 50%, 55%), 0 8px 24px hsl(330, 50%, 50%, 0.2)",
              height: "4.5rem",
            }}
          >
            <div className="w-full h-3" style={{ background: "hsl(45, 90%, 85%)" }} />
            {/* Decorations */}
            <div className="flex justify-around px-4 mt-2 text-lg">
              <span>🍓</span><span>🌸</span><span>🍓</span><span>🌸</span><span>🍓</span>
            </div>
          </div>
        </div>

        {/* Plate */}
        <div
          className="w-80 h-4 mx-auto rounded-b-full"
          style={{ background: "linear-gradient(to bottom, hsl(var(--muted)), hsl(330, 20%, 82%))" }}
        />
      </div>

      <button
        onClick={handleBlow}
        disabled={blowing}
        className="px-8 py-4 rounded-full text-xl font-display font-bold text-primary-foreground transition-all duration-300 disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
          boxShadow: "0 4px 20px hsl(var(--primary) / 0.4)",
          animation: !blowing ? "pulse-glow 2s ease-in-out infinite" : "none",
          transform: blowing ? "scale(0.95)" : "scale(1)",
        }}
      >
        {blowing ? "✨ Making a wish... ✨" : "Blow the Candle 🎂"}
      </button>
    </div>
  );
};

export default BirthdayCake;
