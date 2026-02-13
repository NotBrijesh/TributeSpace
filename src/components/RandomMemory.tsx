import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { friendshipQuotes } from "@/lib/data";

const RandomMemory = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const getRandomQuote = () => {
    let next: string;
    do {
      next = friendshipQuotes[Math.floor(Math.random() * friendshipQuotes.length)];
    } while (next === quote && friendshipQuotes.length > 1);
    setQuote(next);
    setKey((k) => k + 1);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            A Little <span className="gradient-text italic">Warmth</span> 💭
          </h2>
          <p className="text-muted-foreground font-sans mb-10">
            Need a smile? Let us remind you why friendship is everything.
          </p>

          <motion.button
            onClick={getRandomQuote}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-accent text-primary-foreground font-sans font-semibold text-base glow-lavender"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-5 h-5" />
            Give Me a Random Memory 💭
          </motion.button>

          <AnimatePresence mode="wait">
            {quote && (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="mt-10 glass rounded-2xl p-8 glow-pink"
              >
                <p className="font-display text-xl md:text-2xl italic text-foreground leading-relaxed">
                  "{quote}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RandomMemory;
