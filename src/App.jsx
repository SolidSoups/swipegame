import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useState } from "react";
import Card from "./Card";
import { useCardDeck } from "./useCardDeck";
import { usePlayerManager } from "./player/usePlayerManager";

const PROMPTS = [
  { text: "eat a raw onion?", points: { no: 10, yes: -10 } },
  { text: "skydive?", points: { no: -10, yes: 20 } },
  { text: "live without coffee?", points: { no: 5, yes: 10 } },
  { text: "die?", points: { no: 100, yes: 0 } },
  { text: "pet sunshine?", points: { no: 0, yes: 100 } },
  { text: "swim in lava?", points: { no: 15, yes: -30 } },
  { text: "learn to code?", points: { no: -5, yes: 25 } },
  { text: "travel the world?", points: { no: 10, yes: 30 } },
  { text: "give up social media?", points: { no: 5, yes: 20 } },
  { text: "become a vegan?", points: { no: 8, yes: 15 } },
  { text: "write a book?", points: { no: 12, yes: 35 } },
  { text: "learn an instrument?", points: { no: 10, yes: 25 } },
  { text: "start a business?", points: { no: 5, yes: 40 } },
  { text: "run a marathon?", points: { no: 8, yes: 20 } },
  { text: "speak another language?", points: { no: 10, yes: 30 } },
];

const NAMES = ["Elias", "Roza", "Sunshine", "Pearl"];

export default function App() {
  const [points, setPoints] = useState(0);
  const { prompt, advance } = useCardDeck(PROMPTS);
  const { players, reset, nextTurn, currentPlayer } = usePlayerManager(NAMES);
  console.log("Players:", players);

  const handleSwipe = (answer) => {
    console.log(`User answered: ${answer}`);

    // add points
    if (answer == "yes") setPoints(points + prompt.points.yes);
    else setPoints(points + prompt.points.no);

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
          position={[-1, 3.15 - i * 0.3, 0]}
          fontSize={0.12}
          color="#888"
          anchorX="left"
        >
          {(currentPlayer().name == player.name ? "+ " : "  ") +
            player.name +
            ": " +
            player.points}
        </Text>
      ))}

      {/* Draw debug points */}
      <Text position={[0, -3.5, 0]} fontSize={0.15} color="#ff4444">
        {"aura: " + points}
      </Text>

      {/* Draw the actual card */}
      <Card prompt={prompt} onSwipe={handleSwipe} />
    </Canvas>
  );
}
