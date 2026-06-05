import { useState } from "react";
import Home from "./components/Home";
import Setup from "./components/Setup";
import Game from "./components/Game";
import Config from "./components/Config";
import DeckEdit from "./components/DeckEdit";

export default function App() {
  const [screen, setScreen] = useState<"home" | "setup" | "game" | "config" | "deckEdit">("home");
  const [selectedDeck, setSelectedDeck] = useState<{ id: string; name: string; lines: string[] } | null>(null);
  const saved = localStorage.getItem("playerNames");
  const [playerNames, setPlayerNames] = useState<string[]>(
    saved ? JSON.parse(saved) : ["Elias", "Roza", "Sunshine", "Pearl"]
  );
  const [decks, setDecks] = useState([
    {
      id: "1",
      name: "General Trivia",
      lines: [
        "What is the capital of France?",
        "How many continents are there?",
        "What is the largest planet?",
        "Who wrote Romeo and Juliet?",
        "What year did the Titanic sink?",
      ],
    },
    {
      id: "2",
      name: "Movies & TV",
      lines: [
        "Who directed The Matrix?",
        "What year was Avatar released?",
        "Which show has the most Emmy wins?",
        "What is the highest-grossing film of all time?",
        "Who plays Tony Stark?",
      ],
    },
    {
      id: "3",
      name: "Sports",
      lines: [
        "How many players are on a basketball team?",
        "What is the maximum score in bowling?",
        "Which country has won the most World Cups?",
        "How long is a tennis court?",
        "What sport uses a puck?",
      ],
    },
    {
      id: "4",
      name: "History",
      lines: [
        "What year did World War 2 end?",
        "Who was the first President of the USA?",
        "What ancient wonder still stands today?",
        "In what year did the Berlin Wall fall?",
        "Who was the first astronaut on the moon?",
      ],
    },
    {
      id: "5",
      name: "Science",
      lines: [
        "What is the chemical symbol for gold?",
        "How many bones are in the human body?",
        "What is the speed of light?",
        "How many sides does a hexagon have?",
        "What gas do plants produce?",
      ],
    },
  ]);

  if (screen === "home") return <Home onPlay={() => setScreen("setup")} onConfig={() => setScreen("config")} />;
  if (screen === "setup") return <Setup playerNames={playerNames} setPlayerNames={setPlayerNames} onPlay={(names) => {
    localStorage.setItem("playerNames", JSON.stringify(names));
    setPlayerNames(names);
    setScreen("game");
  }} onBack={() => setScreen("home")} />;
  if (screen === "config") return <Config decks={decks} setDecks={setDecks} onBack={() => setScreen("home")} onSelectDeck={(deck) => {
    setSelectedDeck(deck);
    setScreen("deckEdit");
  }} />;
  if (screen === "deckEdit" && selectedDeck) return <DeckEdit deckId={selectedDeck.id} deckName={selectedDeck.name} lines={selectedDeck.lines} onSave={(updatedLines) => {
    setDecks(prev => prev.map(d => d.id === selectedDeck.id ? { ...d, lines: updatedLines } : d));
  }} onBack={() => setScreen("config")} />;
  return <Game playerNames={playerNames} />;
}
