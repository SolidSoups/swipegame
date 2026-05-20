import { useState } from "react";
import { PlayerManager } from "./PlayerManager";

export function usePlayerManager(names) {
  const [manager] = useState(() => new PlayerManager(names));

  return {
    players: () => manager.getPlayerList(),
    reset: () => manager.resetPlayers(),
    nextTurn: () => manager.nextTurn(),
    currentPlayer: () => manager.getCurrentPlayer(),
  };
}
