import Button from "./Button";
import { useState, useRef, useEffect } from "react";

export default function DeckEdit({
  deckId,
  deckName,
  lines: initialLines,
  onBack,
  onSave,
}: {
  deckId: string;
  deckName: string;
  lines: string[];
  onBack: () => void;
  onSave?: (lines: string[]) => void;
}) {
  const [lines, setLines] = useState(initialLines);
  const [swipedLineIdx, setSwipedLineIdx] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const touchStartX = useRef<number>(0);
  const currentTouchLineIdx = useRef<number | null>(null);

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "0";
    const height = Math.min(textarea.scrollHeight, 150);
    textarea.style.height = height + "px";
  };

  useEffect(() => {
    textareaRefs.current.forEach((textarea) => {
      if (textarea) {
        adjustHeight(textarea);
      }
    });
  }, [lines]);

  const handleLineChange = (idx: number, value: string) => {
    const newLines = [...lines];
    newLines[idx] = value;
    setLines(newLines);
  };

  const handleAddLine = () => {
    // TODO: Re-enable the empty line check after debugging
    // if (lines.length === 0 || lines[lines.length - 1].trim() !== "") {
    //   setLines([...lines, ""]);
    // }
    setLines([...lines, ""]);
  };

  // TODO: Re-enable the empty line check after debugging
  // const canAddLine = lines.length === 0 || lines[lines.length - 1].trim() !== "";
  const canAddLine = true;

  const handleTouchStart = (idx: number, e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    currentTouchLineIdx.current = idx;
    setIsActive(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isActive) return;
    const currentX = e.touches[0].clientX;
    const distance = touchStartX.current - currentX;
    setSwipeOffset(Math.max(0, Math.min(80, distance)));
  };

  const handleTouchEnd = () => {
    setIsActive(false);
    const idx = currentTouchLineIdx.current;
    if (idx !== null && swipeOffset >= 40) {
      setSwipedLineIdx(idx);
      setSwipeOffset(80);
    } else {
      setSwipeOffset(0);
      setSwipedLineIdx(null);
    }
    currentTouchLineIdx.current = null;
  };

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
        {deckName}
      </h1>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
          boxSizing: "border-box",
        }}
        onClick={() => {
          setSwipedLineIdx(null);
          setSwipeOffset(0);
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {lines.map((line, idx) => (
          <div
            key={idx}
            style={{
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              alignItems: "stretch",
              overflow: "hidden",
              borderRadius: "4px",
              flexShrink: 0,
              margin: "0 auto",
              boxSizing: "border-box",
            }}
            onTouchStart={(e) => handleTouchStart(idx, e)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <textarea
              ref={(el) => {
                textareaRefs.current[idx] = el;
              }}
              value={line}
              onChange={(e) => handleLineChange(idx, e.target.value)}
              onInput={(e) => adjustHeight(e.currentTarget)}
              onClick={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                fontSize: "14px",
                lineHeight: "1.5",
                color: "#000",
                fontFamily: "inherit",
                resize: "none",
                overflow: "hidden",
                boxSizing: "border-box",
                transform: swipedLineIdx === idx ? `translateX(-80px)` : "none",
                transition: isActive ? "none" : "transform 0.2s ease-out",
              }}
              />
            <button
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "80px",
                backgroundColor: "#ff4444",
                color: "#fff",
                border: "none",
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Delete
            </button>
          </div>
        ))}

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddLine();
          }}
          disabled={!canAddLine}
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            backgroundColor: canAddLine ? "#fff" : "#e8e8e8",
            border: "2px solid #000",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: canAddLine ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            opacity: canAddLine ? 1 : 0.5,
          }}
        >
          + Add Line
        </button>
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => {
          onSave?.(lines);
          onBack();
        }}>Back</Button>
      </div>
    </div>
  );
}
