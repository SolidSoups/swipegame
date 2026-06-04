import { useState } from "react";
import Home from "./components/Home";
import Setup from "./components/Setup";
import Game from "./components/Game";
import Config from "./components/Config";

export default function App() {
  const [screen, setScreen] = useState<"home" | "setup" | "game" | "config">("home");

  if (screen === "home") return <Home onPlay={() => setScreen("setup")} onConfig={() => setScreen("config")} />;
  if (screen === "setup") return <Setup onPlay={() => setScreen("game")} onBack={() => setScreen("home")} />;
  if (screen === "config") return <Config onBack={() => setScreen("home")} />;
  return <Game />;
}
