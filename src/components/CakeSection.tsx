import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import birthdayCake from "@/assets/birthday-cake.png";
import confetti from "canvas-confetti";

const TOTAL_CANDLES = 5;

export const CakeSection = () => {
  const [blownCount, setBlownCount] = useState(0);
  const [smokeIds, setSmokeIds] = useState<number[]>([]);
  const allBlown = blownCount >= TOTAL_CANDLES;

  const blowCandle = (index: number) => {
    if (index !== blownCount) return; // must blow in order
    setSmokeIds((prev) => [...prev, index]);
    setBlownCount((prev) => {
      const next = prev + 1;
      if (next >= TOTAL_CANDLES) {
        setTimeout(() => {
          confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#FF9A9A", "#FFF3B0"],
          });
        }, 300);
      }
      return next;
    });
  };

  const resetCandles = () => {
    setBlownCount(0);
    setSmokeIds([]);
  };

  return (
    <section className="py-24 px-6 overflow-hidden" style={{ background: "hsl(0 33% 97%)" }}>
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-14">
        {/* Cake image with interactive candles */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          <div className="relative select-none">
            {/* Glow behind cake */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-75"
              style={{ background: "radial-gradient(circle, hsl(var(--secondary)), hsl(var(--primary)))" }}
            />

            <motion.img
              src={birthdayCake}
              alt="Beautiful birthday cake with candles"
              className="relative w-80 md:w-96 drop-shadow-2xl rounded-2xl cursor-pointer"
              animate={allBlown ? { scale: [1, 1.04, 1] } : { y: [-6, 6, -6] }}
              transition={
                allBlown
                  ? { duration: 0.4, ease: "easeInOut" }
                  : { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }
            />

            {/* Interactive candles */}
            {[...Array(TOTAL_CANDLES)].map((_, i) => {
              const blown = i < blownCount;
              const isNext = i === blownCount;
              return (
                <motion.div
                  key={i}
                  className="absolute flex flex-col items-center cursor-pointer"
                  style={{ left: `${16 + i * 14}%`, top: "-18px" }}
                  onClick={() => blowCandle(i)}
                  whileHover={isNext ? { scale: 1.3 } : {}}
                  title={isNext ? "Click to blow out!" : ""}
                >
                  {/* Flame */}
                  <AnimatePresence>
                    {!blown && (
                      <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                      >
                        <motion.span
                          style={{ fontSize: "1.1rem", display: "block" }}
                          animate={
                            isNext
                              ? { scale: [0.9, 1.3, 0.9], opacity: [0.8, 1, 0.8] }
                              : { scale: [0.8, 1.1, 0.8], opacity: [0.7, 1, 0.7] }
                          }
                          transition={{
                            duration: isNext ? 0.8 : 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.15,
                          }}
                        >
                          🔥
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Smoke puff after blown */}
                  <AnimatePresence>
                    {smokeIds.includes(i) && (
                      <motion.div
                        initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -30, scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          top: "-10px",
                          fontSize: "1rem",
                          pointerEvents: "none",
                        }}
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Candle stick */}
                  <div
                    style={{
                      width: "8px",
                      height: "20px",
                      borderRadius: "4px",
                      background: blown
                        ? "hsl(var(--muted-foreground) / 0.4)"
                        : `hsl(${45 + i * 30} 90% 65%)`,
                      transition: "background 0.4s",
                      marginTop: blown ? "0" : "-2px",
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Hint label */}
            <AnimatePresence>
              {!allBlown && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-xs tracking-widest uppercase"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  🕯️ Click candles to blow them out!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Celebration message */}
            <AnimatePresence>
              {allBlown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-display italic text-base font-bold"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  🎉 Your wish is on its way!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          <p
            className="font-body text-sm tracking-[0.4em] uppercase mb-3"
            style={{ color: "hsl(var(--accent))" }}
          >
            make a wish
          </p>
          <h2
            className="font-display text-5xl md:text-6xl font-bold leading-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Blow Out the
          </h2>
          <h2
            className="font-display italic text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "hsl(var(--primary))" }}
          >
            Candles! 🕯️
          </h2>

          <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
            <div className="h-px w-12" style={{ background: "hsl(var(--gold))" }} />
            <Flame className="w-4 h-4" style={{ color: "hsl(var(--secondary))" }} />
            <div className="h-px w-12" style={{ background: "hsl(var(--gold))" }} />
          </div>

          <p
            className="font-body text-lg leading-relaxed mb-6"
            style={{ color: "hsl(var(--foreground) / 0.75)" }}
          >
            Close your eyes, take a deep breath, and make the most beautiful wish — because today, the universe is
            listening just for <em>you</em>.
          </p>

          <p
            className="font-body text-base leading-relaxed mb-6"
            style={{ color: "hsl(var(--foreground) / 0.6)" }}
          >
            May every candle you blow out carry your dreams higher, your laughter louder, and your heart fuller.
            Another year, another beautiful chapter begins! 🎂✨
          </p>

          {/* Candle progress */}
          <div className="mb-6">
            <p className="font-body text-sm mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
              {allBlown
                ? "🎉 All candles blown — wish sent!"
                : `${blownCount} of ${TOTAL_CANDLES} candles blown`}
            </p>
            <div className="flex gap-2 justify-center lg:justify-start">
              {[...Array(TOTAL_CANDLES)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs border"
                  style={{
                    background: i < blownCount ? "hsl(var(--accent))" : "hsl(var(--muted))",
                    borderColor:
                      i < blownCount ? "hsl(var(--accent))" : "hsl(var(--border))",
                    color: i < blownCount ? "white" : "hsl(var(--muted-foreground))",
                  }}
                  animate={i < blownCount ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {i < blownCount ? "✓" : "🕯️"}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reset button */}
          <AnimatePresence>
            {allBlown && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={resetCandles}
                className="font-body text-sm px-5 py-2 rounded-full border transition-all hover:scale-105 mb-6"
                style={{
                  borderColor: "hsl(var(--primary) / 0.4)",
                  color: "hsl(var(--primary))",
                  background: "hsl(var(--primary) / 0.06)",
                }}
              >
                🔄 Light them again!
              </motion.button>
            )}
          </AnimatePresence>

          {/* Decorative badges */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {["🎂 Sweet Moments", "🕯️ Endless Wishes", "✨ New Adventures"].map((badge) => (
              <span
                key={badge}
                className="font-body text-sm px-4 py-2 rounded-full border"
                style={{
                  borderColor: "hsl(var(--primary) / 0.3)",
                  color: "hsl(var(--primary))",
                  background: "hsl(var(--primary) / 0.06)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
