import Button from "./Button";

export default function Setup({
  onPlay,
  onBack,
}: {
  onPlay: () => void;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
          fontSize: "64px",
          marginBottom: "60px",
          color: "#000",
        }}
      >
        Setup
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "80vw", maxWidth: "600px" }}>
        <Button onClick={onPlay}>Play</Button>
        <Button onClick={onBack}>Back</Button>
      </div>
    </div>
  );
}
