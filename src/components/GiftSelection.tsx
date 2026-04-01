import { useState } from "react";

interface Props {
  onComplete: (gift: string) => void;
}

const GIFTS = [
  "Chocolate 🍫", "Hug 🤗", "Secret Surprise 🎁",
  "Flowers 💐", "Love Letter 💌", "Teddy Bear 🧸",
  "Ice Cream 🍦", "Magic Wish ✨", "Crown 👑",
];

const GIFT_COLORS = [
  "gift-1", "gift-2", "gift-3",
  "gift-4", "gift-5", "gift-6",
  "gift-7", "gift-8", "gift-9",
];

const GiftSelection = ({ onComplete }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setRevealed(true);
    const gift = GIFTS[index];
    localStorage.setItem("mumuGift", gift);
    setTimeout(() => onComplete(gift), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 animate-[fade-in_0.6s_ease-out]">
      <h1 className="text-3xl md:text-4xl font-display text-gradient mb-2 text-center">
        🎁 Pick Your Gift! 🎁
      </h1>
      <p className="text-muted-foreground font-body mb-8 text-center">
        Choose one box to reveal your surprise!
      </p>

      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-sm mx-auto">
        {Array.from({ length: 9 }).map((_, i) => {
          const isSelected = selected === i;
          const isDisabled = selected !== null && !isSelected;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isDisabled}
              className={`
                relative w-24 h-24 md:w-28 md:h-28 rounded-xl font-display text-lg
                transition-all duration-500 overflow-hidden
                ${isDisabled ? "opacity-30 scale-90" : ""}
                ${!isSelected && !isDisabled ? "cursor-pointer" : ""}
              `}
              style={{
                background: `linear-gradient(135deg, hsl(var(--gift-${i + 1})), hsl(var(--gift-${((i + 3) % 9) + 1})))`,
                boxShadow: isSelected
                  ? `0 0 30px hsl(var(--gift-${i + 1}) / 0.6)`
                  : `0 4px 12px hsl(var(--gift-${i + 1}) / 0.3)`,
                animation: !isDisabled && !isSelected ? `gift-wobble 2s ease-in-out infinite ${i * 0.2}s` : "none",
                transform: isSelected ? "scale(1.1)" : undefined,
              }}
            >
              {isSelected && revealed ? (
                <span className="text-sm md:text-base font-bold text-primary-foreground drop-shadow-md animate-[scale-in_0.3s_ease-out]">
                  {GIFTS[i]}
                </span>
              ) : (
                <span className="text-3xl md:text-4xl drop-shadow-md">🎁</span>
              )}

              {/* Ribbon */}
              {!revealed || !isSelected ? (
                <>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-primary-foreground/20" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-3 bg-primary-foreground/20" />
                </>
              ) : null}
            </button>
          );
        })}
      </div>

      {revealed && selected !== null && (
        <p className="mt-6 text-xl font-display text-foreground animate-[fade-in_0.5s_ease-out]">
          You got: <span className="text-gradient font-bold">{GIFTS[selected]}</span>
        </p>
      )}
    </div>
  );
};

export default GiftSelection;
