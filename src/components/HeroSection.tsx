import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import heroBirthday from "@/assets/hero-birthday.jpg";

export const HeroSection = () => {
  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBirthday})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      {/* Soft color overlay */}
      <div className="absolute inset-0 bg-background/40" />

      {/* Floating decorative hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary opacity-60 select-none pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 20}%`,
            fontSize: `${1 + (i % 3) * 0.5}rem`,
          }}
          animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          ♥
        </motion.div>
      ))}

      {/* Floating stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute select-none pointer-events-none"
          style={{
            right: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 18}%`,
            color: `hsl(var(--secondary))`,
            fontSize: `${0.8 + (i % 3) * 0.4}rem`,
          }}
          animate={{ y: [-6, 6, -6], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        >
          ★
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          className="font-body text-sm tracking-[0.4em] uppercase mb-4"
          style={{ color: "hsl(var(--primary))" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A special day for a special soul
        </motion.p>

        <motion.h1
          className="font-display text-6xl md:text-8xl font-bold leading-tight mb-2"
          style={{ color: "hsl(var(--foreground))" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          Happy
        </motion.h1>

        <motion.h1
          className="font-display italic text-6xl md:text-8xl font-bold leading-tight mb-6"
          style={{ color: "hsl(var(--primary))" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          Birthday, Marza!
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="h-px w-16" style={{ background: "hsl(var(--gold))" }} />
          <Heart className="w-4 h-4 fill-current" style={{ color: "hsl(var(--primary))" }} />
          <div className="h-px w-16" style={{ background: "hsl(var(--gold))" }} />
        </motion.div>

        <motion.p
          className="font-body text-lg md:text-xl"
          style={{ color: "hsl(var(--foreground) / 0.7)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          To my dearest Marza — this one's all for you 🎉
        </motion.p>

        <motion.button
          onClick={scrollDown}
          className="mt-12 flex flex-col items-center gap-2 mx-auto font-body text-sm tracking-widest uppercase cursor-pointer"
          style={{ color: "hsl(var(--foreground) / 0.5)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          whileHover={{ color: "hsl(var(--primary))" }}
        >
          <span>Scroll to open</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};
