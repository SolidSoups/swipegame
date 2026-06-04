export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "80vw",
        maxWidth: "600px",
        padding: "20px 60px",
        fontSize: "24px",
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: "#000",
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </button>
  );
}
