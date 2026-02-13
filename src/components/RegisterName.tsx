import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Sparkles } from "lucide-react";
import { registerName, getRegisteredNames } from "@/lib/data";

const RegisterName = ({ onRegister }: { onRegister: () => void }) => {
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);
  const names = getRegisteredNames();

  const handleRegister = () => {
    if (!name.trim()) return;
    registerName(name.trim());
    setRegistered(true);
    onRegister();
    setTimeout(() => {
      setName("");
      setRegistered(false);
    }, 2500);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Add Your <span className="gradient-text italic">Name</span> ✨
          </h2>
          <p className="text-muted-foreground font-sans">
            Register yourself so your friends can leave you a memory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 md:p-8 space-y-5"
        >
          {registered ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <Sparkles className="w-12 h-12 mx-auto text-primary mb-3 animate-gentle-pulse" />
              <p className="font-display text-2xl text-foreground">You're in! ✨</p>
              <p className="text-muted-foreground mt-2 font-sans text-sm">Your friends can now leave you a memory.</p>
            </motion.div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-sans font-medium text-foreground mb-2">Your Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
              </div>
              <motion.button
                onClick={handleRegister}
                disabled={!name.trim()}
                className="w-full py-4 rounded-xl gradient-accent text-primary-foreground font-sans font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-pink"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-4 h-4" />
                Register My Name
              </motion.button>
            </>
          )}

          {names.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground font-sans mb-3">
                {names.length} classmate{names.length !== 1 ? "s" : ""} registered
              </p>
              <div className="flex flex-wrap gap-2">
                {names.map((n) => (
                  <span
                    key={n}
                    className="px-3 py-1 rounded-full text-xs font-sans bg-muted/60 text-foreground border border-border"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterName;
