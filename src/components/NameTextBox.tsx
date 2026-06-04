export default function NameTextBox({
  value,
  onChange,
  onRemove,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  placeholder?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "54px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: "16px",
          border: "none",
          fontSize: "18px",
          fontFamily: "Georgia, serif",
          color: "#000",
          backgroundColor: "transparent",
          outline: "none",
        }}
      />
      <button
        onClick={onRemove}
        style={{
          padding: "16px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "18px",
          color: "#aaa",
        }}
      >
        ×
      </button>
    </div>
  );
}
