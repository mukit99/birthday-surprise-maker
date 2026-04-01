import { useState, useCallback } from "react";
import confetti from "canvas-confetti";

interface Props {
  gift: string;
}

const ClaimSurprise = ({ gift }: Props) => {
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#f472b6", "#a78bfa", "#fbbf24", "#fb923c", "#34d399"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#f472b6", "#a78bfa", "#fbbf24", "#fb923c", "#34d399"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleClick = () => {
    if (revealed) return;
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setRevealed(true);
      fireConfetti();
    }
  };

  const scale = 1 + clicks * 0.15;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 animate-[fade-in_0.6s_ease-out]">
      {!revealed ? (
        <>
          <h1 className="text-3xl md:text-4xl font-display text-gradient mb-4 text-center">
            💝 Almost There! 💝
          </h1>
          <p className="text-muted-foreground font-body mb-2">
            Your gift: <span className="font-bold">{gift}</span>
          </p>
          <p className="text-muted-foreground font-body mb-8 text-sm">
            Tap the button {5 - clicks} more time{5 - clicks !== 1 ? "s" : ""}!
          </p>

          <button
            onClick={handleClick}
            className="px-8 py-4 rounded-full text-xl font-display font-bold text-primary-foreground transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
              boxShadow: `0 4px ${20 + clicks * 8}px hsl(var(--primary) / ${0.3 + clicks * 0.1})`,
              transform: `scale(${scale})`,
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            Claim Your Gift 🎁
          </button>

          <div className="flex gap-2 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: i < clicks
                    ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))"
                    : "hsl(var(--muted))",
                  transform: i < clicks ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center animate-[scale-in_0.5s_ease-out] max-w-md">
          <div className="text-6xl mb-6">🎉🎂🎉</div>
          <h1 className="text-4xl md:text-5xl font-display text-gradient mb-4">
            Happy Birthday Mumu!
          </h1>
          <div
            className="rounded-2xl p-8 mb-6"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))",
              border: "2px solid hsl(var(--primary) / 0.2)",
            }}
          >
            <p className="text-xl font-body text-foreground leading-relaxed">
              From your brother <span className="font-bold text-gradient">Mukit</span> 💖
            </p>
            <p className="text-lg font-body text-muted-foreground mt-4 leading-relaxed">
              May your life be full of happiness, smiles, and surprises! 🌟
            </p>
            <p className="text-lg font-body text-muted-foreground mt-2">
              Your gift: <span className="font-bold">{gift}</span>
            </p>
          </div>
          <div className="flex justify-center gap-2 text-3xl">
            {["💖", "🎂", "🎁", "✨", "🌸"].map((e, i) => (
              <span
                key={i}
                className="inline-block"
                style={{ animation: `gift-wobble 1.5s ease-in-out infinite ${i * 0.2}s` }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Floating hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-xl"
            style={{
              left: `${5 + i * 10}%`,
              bottom: "-5%",
              opacity: 0.2,
              animation: `float-heart ${5 + i * 1.2}s linear infinite ${i * 0.6}s`,
            }}
          >
            {["💖", "💗", "✨", "🌸", "💝"][i % 5]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ClaimSurprise;
