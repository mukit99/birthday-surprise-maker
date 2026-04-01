import { useState } from "react";
import BirthdayCake from "@/components/BirthdayCake";
import GiftSelection from "@/components/GiftSelection";
import ClaimSurprise from "@/components/ClaimSurprise";

type Stage = "cake" | "gifts" | "claim";

const Index = () => {
  const [stage, setStage] = useState<Stage>("cake");
  const [selectedGift, setSelectedGift] = useState("Secret Surprise 🎁");

  return (
    <div className="min-h-screen overflow-hidden">
      {stage === "cake" && (
        <BirthdayCake onComplete={() => setStage("gifts")} />
      )}
      {stage === "gifts" && (
        <GiftSelection
          onComplete={(gift) => {
            setSelectedGift(gift);
            setStage("claim");
          }}
        />
      )}
      {stage === "claim" && <ClaimSurprise gift={selectedGift} />}
    </div>
  );
};

export default Index;
