import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import MemoryForm from "@/components/MemoryForm";
import MemoryWall from "@/components/MemoryWall";
import RandomMemory from "@/components/RandomMemory";
import ContactVault from "@/components/ContactVault";
import ThemeToggle from "@/components/ThemeToggle";
import { getMemories } from "@/lib/data";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Index = () => {
  const [memories, setMemories] = useState(getMemories());

  const refresh = useCallback(() => {
    setMemories(getMemories());
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <ThemeToggle />
      <HeroSection />

      {/* Divider */}
      <div className="flex items-center justify-center py-4">
        <div className="h-px w-24 bg-border" />
        <Heart className="w-4 h-4 mx-4 text-primary animate-gentle-pulse" />
        <div className="h-px w-24 bg-border" />
      </div>

      <MemoryForm onSubmit={refresh} />
      <MemoryWall memories={memories} />
      <RandomMemory />

      {/* Divider */}
      <div className="flex items-center justify-center py-4">
        <div className="h-px w-24 bg-border" />
        <Heart className="w-4 h-4 mx-4 text-primary animate-gentle-pulse" />
        <div className="h-px w-24 bg-border" />
      </div>

      <ContactVault />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 text-center px-6"
      >
        <p className="font-display text-xl md:text-2xl text-foreground mb-2 italic">
          "We didn't realize we were making memories,
          <br />
          we just knew we were having fun."
        </p>
        <p className="text-muted-foreground font-sans text-sm mt-6">
          Made with 💖 by Class 11th 2025-26
        </p>
      </motion.footer>
    </div>
  );
};

export default Index;
