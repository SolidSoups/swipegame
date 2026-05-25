import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export default function App() {
  const [players, setPlayers] = useState<Player[]>([
    { name: "elias", yess: 0, nos: 0, streak: 0 },
    { name: "roza", yess: 0, nos: 0, streak: 0 },
    { name: "sunshine", yess: 0, nos: 0, streak: 0 },
    { name: "pearl", yess: 0, nos: 0, streak: 0 },
  ]);
  const [cards, setCards] = useState<CardData[]>([
    { text: "Pet Sunshine?" },
    { text: "Pet Pearl?" },
    { text: "Fly an airplane?" },
    { text: "Go in a deep-water submarine?" },
    { text: "Touch some grass? stinky ass." },
  ]);
  const [cardIndex, setCardIndex] = useState<number>(0);

  const onSwipeEnd = (swipeDirection: "left" | "right") => {
    setCardIndex((prevCardIdx) => (prevCardIdx + 1) % cards.length);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#f3f3f3",
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        position: "relative",
      }}
    >
      {/* Version info - top left */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "12px",
          color: "#000",
        }}
      >
        prototype-{__GIT_COMMIT__}
      </div>

      <AnimatePresence mode="wait">
        <Card key={cardIndex} data={cards[cardIndex]} onSwipeEnd={onSwipeEnd} />
      </AnimatePresence>

      <DebugPlayers players={players} />
    </div>
  );
}

const Card = ({ data, onSwipeEnd }) => {
  const x = useMotionValue(0);

  const backgroundColor = useTransform(
    x,
    [-150, 0, 150],
    ["#ff4444", "#ffffff", "#44ff44"],
  );

  const handleDragEnd = () => {
    const xVal = x.get();
    if (xVal < -100) {
      animate(x, -500, { duration: 0.3, ease: "easeOut" }).then(() => onSwipeEnd("left"));
    } else if (xVal > 100) {
      animate(x, 500, { duration: 0.3, ease: "easeOut" }).then(() => onSwipeEnd("right"));
    } else {
      animate(x, 0, { type: "spring" });
    }
  };


  return (
    <motion.div
      style={{
        width: "280px",
        height: "380px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
        x,
        backgroundColor,
      }}
      initial={{ opacity: 0, x: 0, y: -500 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      draggable={false}
      drag={"x"}
      onDragEnd={handleDragEnd}
    >
      <p style={{ fontSize: "18px" }}>{data.text}</p>
    </motion.div>
  );
};

const DebugPlayers = ({ players }: { players: Player[] }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        fontSize: "12px",
        color: "#000",
        lineHeight: "1.5",
      }}
    >
      {players.map((p) => (
        <div key={p.name}>
          {p.name}=[yes(s): {p.yess} | no(s): {p.nos} | streak: {p.streak}]
        </div>
      ))}
    </div>
  );
};

interface Player {
  name: string;
  yess: number;
  nos: number;
  streak: number;
}

interface CardData {
  text: string;
}
