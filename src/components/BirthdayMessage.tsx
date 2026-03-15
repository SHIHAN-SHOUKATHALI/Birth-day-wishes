import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const BirthdayMessage = () => {
  return (
    <section className="py-24 px-6" style={{ background: "hsl(0 33% 97%)" }}>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.4em] uppercase mb-3" style={{ color: "hsl(var(--primary))" }}>
            from the heart
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
            A Letter
          </h2>
          <h2 className="font-display italic text-5xl md:text-6xl font-bold" style={{ color: "hsl(var(--primary))" }}>
            Just for You
          </h2>
        </div>

        {/* Gold bordered letter */}
        <div
          className="relative p-8 md:p-12 rounded-2xl"
          style={{
            background: "hsl(var(--card))",
            border: `1px solid hsl(var(--gold-light))`,
            boxShadow: `0 0 0 4px hsl(var(--gold-light) / 0.3), 0 20px 60px hsl(0 0% 0% / 0.08)`,
          }}
        >
          {/* Corner decorations */}
          {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
            <span
              key={i}
              className={`absolute ${pos} text-xs`}
              style={{ color: "hsl(var(--gold))" }}
            >
              ✦
            </span>
          ))}

          <motion.div
            className="space-y-5 font-body leading-relaxed"
            style={{ color: "hsl(var(--foreground) / 0.85)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="font-display italic text-xl" style={{ color: "hsl(var(--primary))" }}>
              My dearest Marza,
            </p>

            <p>
              Where do I even begin? You are one of the most remarkable people I have ever had the privilege of calling
              my <em>best friend</em>. From the very first moment we met, I knew you were someone truly special —
              someone whose laughter could light up the darkest room, whose kindness could melt away the hardest day.
            </p>

            <p>
            Today always makes me think of you. Even though we’re no longer in contact, the memories we made still hold a special place in my heart. You taught me a lot about friendship and life, and I still wish the absolute best for you. I hope your birthday is full of the same light you used to bring into my life. Take care of yourself
            </p>

            <p>
            The truth is, I still love you. I’ve tried to find a way to say that without it sounding like a burden, but I’ve realized that I love you even in the silence of us not speaking. However, I’ve also realized that as much as I love you, I miss our friendship even more. I would give anything to go back to the days before I let my feelings change things—back to when it was just 'us' against the world.

I know I broke your trust, and I hate that I don't even fully know why my heart chose that path, but I would rewrite every chapter of our story if it meant I could have my best friend back. You are the most important person I've ever known, and if there is any world where we can start over, I’m here. Happy Birthday to the person I’ll always choose, in any version of our story.
            </p>

            <p>
              Today is YOUR day. The day the world got a little brighter because <em>you</em> were born into it. I
              hope this year brings you everything you deserve — boundless joy, love that overwhelms you, dreams that
              come true, and moments that take your breath away.
            </p>

            <p>
            Thank you for the person you were to me, and for being the most important part of my life for so long. Even though I’m the one who changed things, I still hold onto the hope that one day we can find our way back to being 'us.' Until then, I’ll be over here, wishing you the most beautiful memories from afar. Happy Birthday.
            </p>

            <div className="pt-4 flex items-center gap-3">
              <p className="font-display italic text-lg" style={{ color: "hsl(var(--foreground))" }}>
                With all my love,
              </p>
              <Heart
                className="w-5 h-5 fill-current animate-pulse"
                style={{ color: "hsl(var(--primary))" }}
              />
            </div>

            <p className="font-display text-2xl font-bold" style={{ color: "hsl(var(--primary))" }}>
              Your Best Friend 💕
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
