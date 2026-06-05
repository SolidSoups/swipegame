import Button from "./Button";
import { useRef } from "react";

export default function Config({
  decks,
  setDecks,
  onBack,
  onSelectDeck,
}: {
  decks: { id: string; name: string; lines: string[] }[];
  setDecks: (decks: { id: string; name: string; lines: string[] }[]) => void;
  onBack: () => void;
  onSelectDeck?: (deck: { id: string; name: string; lines: string[] }) => void;
}) {
  const addButtonRef = useRef<HTMLButtonElement>(null);

  function handleRemoveDeck(id: string) {
    setDecks(decks.filter((d) => d.id !== id));
  }

  function handleAddDeck() {
    const newId = Date.now().toString();
    setDecks([...decks, { id: newId, name: "New Deck", lines: [] }]);
    setTimeout(() => {
      addButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f3f3f3",
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        position: "relative",
      }}
    >
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

      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "48px",
          marginTop: "40px",
          marginBottom: "30px",
          color: "#000",
          textAlign: "center",
        }}
      >
        Decks
      </h1>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: "40px",
          paddingBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {decks.map((deck) => (
          <div
            key={deck.id}
            style={{
              display: "flex",
              width: "300px",
              border: "2px solid #000",
              borderRadius: "4px",
              backgroundColor: "#fff",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => onSelectDeck?.(deck)}
              style={{
                flex: 1,
                padding: "16px",
                fontSize: "16px",
                backgroundColor: "#fff",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "#fff";
              }}
            >
              {deck.name}
            </button>
            <button
              onClick={() => handleRemoveDeck(deck.id)}
              style={{
                padding: "12px 16px",
                backgroundColor: "transparent",
                border: "none",
                borderLeft: "2px solid #000",
                color: "#ff4444",
                fontSize: "18px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ×
            </button>
          </div>
        ))}
        <button
          ref={addButtonRef}
          onClick={handleAddDeck}
          style={{
            marginTop: "4px",
            width: "300px",
            padding: "16px",
            fontSize: "16px",
            fontFamily: "Georgia, serif",
            color: "#999",
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          + Add Deck
        </button>
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={onBack}>Back</Button>
      </div>
    </div>
  );
}
