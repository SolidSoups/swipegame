import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useState } from "react";
import Card from "./Card";
import { useCardDeck } from "./useCardDeck";

const PROMPTS = [
  { text: "eat a raw onion?", points: { no: 10, yes: -10 } },
  { text: "skydive?", points: { no: -10, yes: 20 } },
  { text: "live without coffee?", points: { no: 5, yes: 10 } },
  { text: "die?", points: { no: 100, yes: 0 } },
  { text: "pet sunshine?", points: { no: 0, yes: 100 } },
];

export default function App() {
  const [points, setPoints] = useState(0);
  const { prompt, advance } = useCardDeck(PROMPTS);

  const handleSwipe = (answer) => {
    console.log(`User answered: ${answer}`);

    // add points
    if (answer == "yes") setPoints(points + prompt.points.yes);
    else setPoints(points + prompt.points.no);

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

      {/* Draw debug latest commit hash */}
      <Text position={[0, 3.5, 0]} fontSize={0.15} color="#888">
        {"prototype-" + __GIT_COMMIT__}
      </Text>

      {/* Draw debug points */}
      <Text position={[0, -3.5, 0]} fontSize={0.15} color="#ff4444">
        {"aura: " + points}
      </Text>

      {/* Draw the actual card */}
      <Card prompt={prompt} onSwipe={handleSwipe} />
    </Canvas>
  );
}
