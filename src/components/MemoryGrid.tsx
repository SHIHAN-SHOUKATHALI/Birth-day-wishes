import { motion } from "framer-motion";
import mem1 from "@/assets/memory-1.jpg";
import mem2 from "@/assets/memory-2.jpg";
import mem3 from "@/assets/memory-3.jpg";
import mem4 from "@/assets/memory-4.jpg";
import mem5 from "@/assets/memory-5.jpg";
import mem6 from "@/assets/memory-6.jpg";

const memories = [
  { img: mem1, caption: "Café mornings that never end ☕", rotate: "-3deg" },
  { img: mem2, caption: "Beach adventures & golden hour 🌅", rotate: "2deg" },
  { img: mem3, caption: "That birthday we'll never forget 🎂", rotate: "-2deg" },
  { img: mem4, caption: "Road trips & endless laughter 🚗", rotate: "3deg" },
  { img: mem5, caption: "Dancing under festival lights ✨", rotate: "-1.5deg" },
  { img: mem6, caption: "Silly moments, forever memories 📸", rotate: "2.5deg" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export const MemoryGrid = () => {
  return (
    <section className="py-24 px-6" style={{ background: "hsl(var(--background))" }}>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="font-body text-sm tracking-[0.4em] uppercase mb-3" style={{ color: "hsl(var(--accent))" }}>
          our memories
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
          A Walk Down
        </h2>
        <h2 className="font-display italic text-5xl md:text-6xl font-bold" style={{ color: "hsl(var(--primary))" }}>
          Memory Lane
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-px w-12" style={{ background: "hsl(var(--gold))" }} />
          <span style={{ color: "hsl(var(--secondary))" }}>✦</span>
          <div className="h-px w-12" style={{ background: "hsl(var(--gold))" }} />
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {memories.map((memory, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 10 }}
            className="cursor-pointer"
            style={{ rotate: memory.rotate }}
          >
            <div
              className="rounded-sm p-3 pb-10 relative"
              style={{
                background: "hsl(var(--card))",
                boxShadow: "var(--shadow-polaroid)",
              }}
            >
              <img
                src={memory.img}
                alt={memory.caption}
                className="w-full aspect-square object-cover rounded-sm"
              />
              <p
                className="absolute bottom-2 left-0 right-0 text-center font-display italic text-sm px-3"
                style={{ color: "hsl(var(--foreground) / 0.7)" }}
              >
                {memory.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
