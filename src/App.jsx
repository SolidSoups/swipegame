import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useState } from "react";
import Card from "./Card";

const PROMPTS = [
  "eat a raw onion?",
  "skydive?",
  "live without coffee?",
  "die?",
  "pet sunshine",
];

export default function App() {
  const [i, setI] = useState(0);

  const handleSwipe = (answer) => {
    console.log(PROMPTS[i], "->", answer);
    setI((n) => n + 1);
  };

  return (
    <Canvas
      style={{ height: "100dvh", background: "#111", touchAction: "none" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} />
      <Text position={[0, 3.5, 0]} fontSize={0.15} color="#888">
        {__GIT_COMMIT__}
      </Text>
      {i < PROMPTS.length ? (
        <Card key={i} prompt={PROMPTS[i]} onSwipe={handleSwipe} />
      ) : (
        <Text fontSize={0.4} color="white">
          done
        </Text>
      )}
    </Canvas>
  );
}
