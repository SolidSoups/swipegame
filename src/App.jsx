import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useState } from "react";
import Card from "./Card";
import { useCardDeck } from "./useCardDeck";

const PROMPTS = [
  "eat a raw onion?",
  "skydive?",
  "live without coffee?",
  "die?",
  "pet sunshine",
];

export default function App() {
  const { prompt, advance } = useCardDeck(PROMPTS);

  const handleSwipe = (answer) => {
    console.log(`User answered: ${answer}`);
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
      <Text position={[0, 3.5, 0]} fontSize={0.15} color="#888">
        {"prototype-" + __GIT_COMMIT__}
      </Text>
      <Card prompt={prompt} onSwipe={handleSwipe} />
    </Canvas>
  );
}
