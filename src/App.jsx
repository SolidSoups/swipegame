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
    <Canvas style={{ height: "100vh", background: "#111" }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} />
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
