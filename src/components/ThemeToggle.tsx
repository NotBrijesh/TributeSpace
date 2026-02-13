import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full glass hover:scale-110 transition-transform"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5 text-warm" /> : <Moon className="w-5 h-5 text-foreground" />}
    </motion.button>
  );
};

export default ThemeToggle;
