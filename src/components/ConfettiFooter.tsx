import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";

const launchConfetti = () => {
  const duration = 3500;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    const particleCount = 60 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#FF9A9A", "#FFF3B0"],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#FF9A9A", "#FFF3B0"],
    });
  }, 250);
};

export const ConfettiFooter = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    launchConfetti();
    setTimeout(() => setClicked(false), 4000);
  };

  return (
    <footer
      className="py-24 px-6 text-center relative overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ background: `linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)` }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto"
      >
        <p className="font-body text-sm tracking-[0.4em] uppercase mb-4" style={{ color: "hsl(var(--accent))" }}>
          celebrate!
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>
          Wish Her a Great
        </h2>
        <h2
          className="font-display italic text-4xl md:text-5xl font-bold mb-8"
          style={{ color: "hsl(var(--primary))" }}
        >
          Year Ahead! 🎉
        </h2>

        <p className="font-body mb-10" style={{ color: "hsl(var(--muted-foreground))" }}>
          Press the button below to send your love and celebrate with a burst of confetti!
        </p>

        <motion.button
          onClick={handleClick}
          disabled={clicked}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-semibold text-lg transition-all"
          style={{
            background: clicked
              ? "hsl(var(--accent))"
              : "linear-gradient(135deg, hsl(var(--primary)), hsl(0 100% 65%))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: clicked ? "none" : "var(--shadow-button)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          {clicked ? (
            <>
              <Heart className="w-5 h-5 fill-current animate-bounce" />
              <span>Sending Love! 💕</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Launch Confetti!</span>
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Footer bottom */}
      <motion.div
        className="mt-20 space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-2 font-display italic text-lg" style={{ color: "hsl(var(--primary))" }}>
          <Heart className="w-4 h-4 fill-current" />
          <span>Made with love for the most amazing Marza</span>
          <Heart className="w-4 h-4 fill-current" />
        </div>
        <p className="font-body text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          © {new Date().getFullYear()} · Happy Birthday! 🎂✨
        </p>
      </motion.div>
    </footer>
  );
};
