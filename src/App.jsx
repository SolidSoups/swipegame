import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useState } from "react";
import Card from "./Card";
import { useCardDeck } from "./useCardDeck";
import { usePlayerManager } from "./player/usePlayerManager";

const PROMPTS = [
  { text: "eat a raw onion?" },
  { text: "skydive?" },
  { text: "live without coffee?" },
  { text: "die?" },
  { text: "pet sunshine?" },
  { text: "swim in lava?" },
  { text: "learn to code?" },
  { text: "travel the world?" },
  { text: "give up social media?" },
  { text: "become a vegan?" },
  { text: "write a book?" },
  { text: "learn an instrument?" },
  { text: "start a business?" },
  { text: "run a marathon?" },
  { text: "speak another language?" },
];

const NAMES = ["Elias", "Roza", "Sunshine", "Pearl"];

export default function App() {
  const { prompt, advance } = useCardDeck(PROMPTS);
  const { players, reset, nextTurn, currentPlayer } = usePlayerManager(NAMES);
  console.log("Players:", players);

  const handleSwipe = (answer) => {
    console.log(`User answered: ${answer}`);

    // add points
    if (answer == "yes") {
      currentPlayer().addPrompt(prompt);
    } else {
      // "no": noop for now
    }

    nextTurn();

    advance();
  };

  if (!prompt) {
    return <div>Game Over!</div>;
  }

  return (
    <Canvas
      style={{ height: "100dvh", background: "#111", touchAction: "none" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} />

      {/* DEBUG TEXT */}
      <Text position={[-1, 3.5, 0]} fontSize={0.15} color="#888" anchorX="left">
        {"prototype-" + __GIT_COMMIT__}
      </Text>
      {players().map((player, i) => (
        <Text
          key={player.name}
          position={[-1, -2.4 - i * 0.3, 0]}
          fontSize={0.12}
          color="#888"
          anchorX="left"
        >
          {`${currentPlayer().name == player.name ? "+" : " "} Name: ${player.name}, Cards: ${player.score()}`}
        </Text>
      ))}

      {/* Draw the actual card */}
      <Card prompt={prompt} onSwipe={handleSwipe} />
    </Canvas>
  );
}
