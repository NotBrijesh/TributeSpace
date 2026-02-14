import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EntranceAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    // Play a gentle chime sound using Web Audio API
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    try {
      const ctx = new AudioContext();
      const playNote = (freq: number, start: number, dur: number, gain: number) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        g.gain.setValueAtTime(0, ctx.currentTime + start);
        g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      };
      // A gentle ascending chime
      playNote(523.25, 0, 1.2, 0.15);    // C5
      playNote(659.25, 0.15, 1.0, 0.12); // E5
      playNote(783.99, 0.3, 1.0, 0.1);   // G5
      playNote(1046.5, 0.5, 1.5, 0.08);  // C6
    } catch {
      // Audio not supported, continue silently
    }

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background */}
          <div className="absolute inset-0 gradient-hero" />
          
          {/* Glowing orbs */}
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ background: "hsl(var(--primary))" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full blur-3xl opacity-20 -translate-x-32 translate-y-20"
            style={{ background: "hsl(var(--lavender))" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="text-6xl md:text-8xl mb-6"
            >
              💫
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="font-sans text-muted-foreground text-lg"
            >
              Class 11th 2025-26
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
              className="mt-8 h-0.5 w-48 mx-auto rounded-full"
              style={{ background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--lavender)), hsl(var(--sky)))" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntranceAnimation;
