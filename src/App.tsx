import { useState } from "react";
import Home from "./components/Home";
import Setup from "./components/Setup";
import Game from "./components/Game";
import Config from "./components/Config";

export default function App() {
  const [screen, setScreen] = useState<"home" | "setup" | "game" | "config">("home");
  const saved = localStorage.getItem("playerNames");
  const [playerNames, setPlayerNames] = useState<string[]>(
    saved ? JSON.parse(saved) : ["Elias", "Roza", "Sunshine", "Pearl"]
  );

  if (screen === "home") return <Home onPlay={() => setScreen("setup")} onConfig={() => setScreen("config")} />;
  if (screen === "setup") return <Setup playerNames={playerNames} setPlayerNames={setPlayerNames} onPlay={(names) => {
    localStorage.setItem("playerNames", JSON.stringify(names));
    setPlayerNames(names);
    setScreen("game");
  }} onBack={() => setScreen("home")} />;
  if (screen === "config") return <Config onBack={() => setScreen("home")} />;
  return <Game playerNames={playerNames} />;
}
