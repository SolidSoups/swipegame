import { motion } from "framer-motion";

export default function App() {
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
          color: "#888",
        }}
      >
        prototype-{__GIT_COMMIT__}
      </div>

      <Card id={0} url={""} setCards={false} cards={null} />
    </div>
  );
}

const Card = ({ id, url, setCards, cards }) => {
  return (
    <motion.div
      style={{
        width: "280px",
        height: "380px",
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
      }}
      drag={"x"}
      dragSnapToOrigin
    >
      <p style={{ fontSize: "18px" }}>Card {id}</p>
    </motion.div>
  );
};
