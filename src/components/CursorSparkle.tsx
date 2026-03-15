import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
}

const EMOJIS = ["✨", "💕", "🌸", "⭐", "💫", "🎀"];

export const CursorSparkle = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const counter = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const throttle = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < 20) return;
      if (throttle.current) return;

      throttle.current = true;
      setTimeout(() => { throttle.current = false; }, 80);

      lastPos.current = { x: e.clientX, y: e.clientY };
      const id = counter.current++;
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const size = 12 + Math.random() * 10;

      setSparkles((prev) => [
        ...prev.slice(-14),
        { id, x: e.clientX, y: e.clientY, emoji, size },
      ]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 700);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0.5, x: s.x - 8, y: s.y - 8 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: s.y - 40,
              x: s.x + (Math.random() - 0.5) * 30 - 8,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ position: "fixed", fontSize: s.size, userSelect: "none" }}
          >
            {s.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
