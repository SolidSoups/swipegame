import Button from "./Button";
import NameTextBox from "./NameTextBox";

export default function Setup({
  playerNames,
  setPlayerNames,
  onPlay,
  onBack,
}: {
  playerNames: string[];
  setPlayerNames: (names: string[]) => void;
  onPlay: (names: string[]) => void;
  onBack: () => void;
}) {
  const handleNameChange = (index: number, newName: string) => {
    const updated = [...playerNames];
    updated[index] = newName;
    setPlayerNames(updated);
  };

  const handleRemove = (index: number) => {
    setPlayerNames(playerNames.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setPlayerNames([...playerNames, ""]);
  };

  const handlePlay = () => {
    const filtered = playerNames.filter((n) => n.trim() !== "");
    onPlay(filtered);
  };

  const handleBack = () => {
    const filtered = playerNames.filter((n) => n.trim() !== "");
    localStorage.setItem("playerNames", JSON.stringify(filtered));
    setPlayerNames(filtered);
    onBack();
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        position: "relative",
        overflow: "hidden",
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
          fontSize: "64px",
          marginTop: "80px",
          marginBottom: "20px",
          color: "#000",
        }}
      >
        Setup
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "80vw",
          maxWidth: "600px",
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: "50px",
          paddingBottom: "50px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 2%, black 98%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 2%, black 98%, transparent 100%)",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {playerNames.map((name, index) => (
          <NameTextBox
            key={index}
            value={name}
            onChange={(newName) => handleNameChange(index, newName)}
            onRemove={() => handleRemove(index)}
            placeholder="Enter a name"
          />
        ))}
        <button
          onClick={handleAdd}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "24px",
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            color: "#999",
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          +
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          width: "80vw",
          maxWidth: "600px",
          paddingTop: "30px",
          paddingBottom: "60px",
          flexShrink: 0,
          minWidth: 0,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <Button onClick={handleBack} style={{ width: "100%", maxWidth: "100%" }}>
            Back
          </Button>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Button onClick={handlePlay} style={{ width: "100%", maxWidth: "100%" }}>
            Play
          </Button>
        </div>
      </div>
    </div>
  );
}
