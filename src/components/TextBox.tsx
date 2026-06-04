export default function TextBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "80vw",
        maxWidth: "600px",
        padding: "16px",
        fontSize: "18px",
        fontFamily: "Georgia, serif",
        color: "#000",
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    />
  );
}
