import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

type Props = {
  text: string;
  speedMs?: number;
  variant?:
    | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    | "subtitle1" | "subtitle2"
    | "body1" | "body2";
  fontWeight?: number;
  showCursor?: boolean;
};

export default function TypewriterText({
  text,
  speedMs = 50,
  variant = "h4",
  fontWeight = 700,
  showCursor = true,
}: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
    const id = setInterval(() => {
      setIdx((i) => (i < text.length ? i + 1 : i));
    }, speedMs);
    return () => clearInterval(id);
  }, [text, speedMs]);

  const visible = text.slice(0, idx);
  const done = idx >= text.length;

  return (
    <Typography variant={variant} fontWeight={fontWeight} component="div">
      {visible}
      {showCursor && !done && ( // 👈 solo renderiza cursor si no terminó
        <span
          style={{
            display: "inline-block",
            width: "1ch",
            marginLeft: 2,
            animation: "kds-blink 0.9s steps(1,end) infinite",
          }}
        >
          |
        </span>
      )}
      <style>
        {`@keyframes kds-blink { 0% {opacity:1} 50% {opacity:0} 100% {opacity:1} }`}
      </style>
    </Typography>
  );
}
