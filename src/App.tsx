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
    { name: "Elias", yess: 0, nos: 0, streak: 0 },
    { name: "Roza", yess: 0, nos: 0, streak: 0 },
    { name: "Sunshine", yess: 0, nos: 0, streak: 0 },
    { name: "Pearl", yess: 0, nos: 0, streak: 0 },
  ]);
  const [cards, setCards] = useState<CardData[]>([
    { text: "Pet Sunshine? 🐈" },
    { text: "Pet Pearl?" },
    { text: "Fly an airplane?" },
    { text: "Go in a deep-water submarine?" },
    { text: "Touch some grass? stinky ass." },
  ]);
  const [playerIdx, setPlayerIdx] = useState<number>(0);
  const [cardIdx, setCardIdx] = useState<number>(0);

  const onSwipeEnd = (swipeDirection: "left" | "right") => {
    if (swipeDirection == "left") {
      players[playerIdx].nos++;
      players[playerIdx].streak = 0;
    } else // "right"
    {
      players[playerIdx].yess++;
      players[playerIdx].streak++;
    }

    // update next indices
    setCardIdx((prevCardIdx) => {
      const nextCardIdx = (prevCardIdx + 1) % cards.length;
      return nextCardIdx;
    });
    setPlayerIdx((prevPlayerIdx) => {
      const nextPlayerIdx = (prevPlayerIdx + 1) % players.length;
      return nextPlayerIdx;
    });
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

      {/* Current player name */}
      <h1
        style={{
          position: "absolute",
          top: "80px",
          fontSize: "50px",
        }}
      >
        {players[playerIdx].name}
      </h1>

      <AnimatePresence mode="wait">
        <Card key={cardIdx} data={cards[cardIdx]} onSwipeEnd={onSwipeEnd} />
      </AnimatePresence>

      <DebugPlayers players={players} currentPlayerIdx={playerIdx} />
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
      animate(x, -500, { duration: 0.3, ease: "easeOut" }).then(() =>
        onSwipeEnd("left"),
      );
    } else if (xVal > 100) {
      animate(x, 500, { duration: 0.3, ease: "easeOut" }).then(() =>
        onSwipeEnd("right"),
      );
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

const DebugPlayers = ({
  players,
  currentPlayerIdx,
}: {
  players: Player[];
  currentPlayerIdx: number;
}) => {
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
      {players.map((p, idx) => (
        <div
          key={p.name}
          style={{ fontWeight: idx === currentPlayerIdx ? "bold" : "normal" }}
        >
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
