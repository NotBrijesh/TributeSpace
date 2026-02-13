import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Memory } from "@/lib/data";

const tiltOptions = [-3, -1.5, 0, 1.5, 3, -2, 2];
const glowOptions = ["glow-pink", "glow-lavender", "glow-sky"];

const MemoryWall = ({ memories }: {memories: Memory[];}) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return memories;
    const q = search.toLowerCase();
    return memories.filter(
      (m) =>
      m.from.toLowerCase().includes(q) ||
      m.to.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  }, [memories, search]);

  if (memories.length === 0) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12">

          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Wall of <span className="gradient-text italic">Memories</span> ✨
          </h2>
          <p className="text-muted-foreground font-sans mb-8">
            Every card holds a piece of someone's heart.
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search memories by name..."
              className="w-full pl-11 pr-4 py-3 rounded-xl glass border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all" />

          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((memory, i) => {}
























          )}
        </div>

        {filtered.length === 0 && search &&
        <p className="text-center text-muted-foreground font-sans mt-8">
            No memories found for "{search}" 💭
          </p>
        }
      </div>
    </section>);

};

export default MemoryWall;