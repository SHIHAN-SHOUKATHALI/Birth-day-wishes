import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { HeroSection } from "@/components/HeroSection";
import { CakeSection } from "@/components/CakeSection";
import { BirthdayMessage } from "@/components/BirthdayMessage";
import { ConfettiFooter } from "@/components/ConfettiFooter";
import { CursorSparkle } from "@/components/CursorSparkle";
import { BackgroundMusic } from "@/components/BackgroundMusic";

const Index = () => {
  useEffect(() => {
    // Auto confetti on load
    const timer = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#FF9A9A"],
      });
    }, 1200);

    // Click-anywhere mini confetti burst
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x, y },
        colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#FF9A9A", "#FFF3B0"],
        startVelocity: 20,
        ticks: 40,
      });
    };

    window.addEventListener("click", handleClick);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <CursorSparkle />
      <BackgroundMusic />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: "hsl(var(--background))", fontFamily: "Montserrat, sans-serif" }}
      >
        <HeroSection />
        <CakeSection />
        <BirthdayMessage />
        <ConfettiFooter />
      </motion.main>
    </>
  );
};

export default Index;
