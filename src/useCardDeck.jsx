import { useState } from "react";
import { CardDeck } from "./CardDeck";

export function useCardDeck(prompts) {
  const [manager] = useState(() => new CardDeck(prompts));
  const [currentIndex, setCurrentIndex] = useState(0);

  return {
    prompt: manager.getCurrentPrompt(),
    advance: () => {
      manager.advance();
      setCurrentIndex(manager.currentIndex);
    },
    reset: () => {
      manager.reset();
      setCurrentIndex(0);
    },
  };
}
