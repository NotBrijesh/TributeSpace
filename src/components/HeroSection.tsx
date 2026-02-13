import { useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const polaroids = [
  { x: "10%", y: "20%", rotate: -8, delay: 0.2 },
  { x: "75%", y: "15%", rotate: 6, delay: 0.5 },
  { x: "5%", y: "60%", rotate: -4, delay: 0.8 },
  { x: "80%", y: "55%", rotate: 10, delay: 1.1 },
  { x: "45%", y: "70%", rotate: -6, delay: 0.6 },
];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 gradient-hero opacity-80" />
      </div>

      {/* Floating orbs */}
      {[
        { size: 300, x: "20%", y: "30%", color: "primary" },
        { size: 200, x: "70%", y: "20%", color: "lavender" },
        { size: 250, x: "80%", y: "70%", color: "sky" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl opacity-20`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `hsl(var(--${orb.color === "primary" ? "primary" : orb.color}))`,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating polaroids */}
      {polaroids.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-24 md:w-28 md:h-32 rounded-sm bg-card shadow-lg p-1.5 hidden md:block"
          style={{
            left: p.x,
            top: p.y,
            ["--rotate" as string]: `${p.rotate}deg`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 0.7,
            scale: 1,
            y: [0, -15, 0],
            rotate: [p.rotate, p.rotate + 2, p.rotate],
          }}
          transition={{
            opacity: { delay: p.delay, duration: 0.8 },
            scale: { delay: p.delay, duration: 0.8 },
            y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 7 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-full h-3/4 rounded-sm bg-muted" />
          <div className="h-1/4 flex items-center justify-center">
            <div className="w-8 h-1 bg-muted rounded-full" />
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.p
            className="text-sm md:text-base font-sans uppercase tracking-[0.3em] text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A Digital Farewell
          </motion.p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-foreground mb-6 text-balance">
            Class 11th 2025-26
            <br />
            <span className="gradient-text italic">
              Not the End, Just a New Beginning.
            </span>
          </h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Every laugh shared in the corridors, every whispered conversation during class,
            every moment of pure friendship — they live here now. Forever.
          </motion.p>

          <motion.a
            href="#memories"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-accent text-primary-foreground font-sans font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 glow-pink"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            Open Our Memories 💫
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
