import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { getRegisteredNames, saveMemory } from "@/lib/data";
import { Heart, Search, Send, User, BookOpen } from "lucide-react";

const MAX_CHARS = 500;

const MemoryForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const registeredNames = getRegisteredNames();
  const filtered = registeredNames.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!from.trim() || !message.trim()) return;
    if (!isPersonal && !to.trim()) return;

    saveMemory({
      from: from.trim(),
      to: isPersonal ? from.trim() : to.trim(),
      message: message.trim(),
      isPersonal,
    });

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
      colors: ["#e8a0bf", "#b4a7d6", "#9fc5e8", "#f9cb9c"],
    });

    setSubmitted(true);
    onSubmit();

    setTimeout(() => {
      setFrom("");
      setTo("");
      setMessage("");
      setSearch("");
      setSubmitted(false);
      setIsPersonal(false);
    }, 3000);
  };

  return (
    <section id="memories" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Leave a <span className="gradient-text italic">Memory</span> 💌
          </h2>
          <p className="text-muted-foreground font-sans">
            Write something beautiful for someone — or share your own personal experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 md:p-8 space-y-5"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Heart className="w-16 h-16 mx-auto text-primary mb-4 animate-gentle-pulse" />
                <p className="font-display text-2xl text-foreground">Sent with love 💖</p>
                <p className="text-muted-foreground mt-2 font-sans">Your memory has been saved forever.</p>
              </motion.div>
            ) : (
              <motion.div key="form" className="space-y-5">
                {/* Toggle: For someone / Personal */}
                <div className="flex gap-2 p-1 rounded-xl bg-muted/50 border border-border">
                  <button
                    onClick={() => setIsPersonal(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-sans text-sm font-medium transition-all ${
                      !isPersonal ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    For Someone
                  </button>
                  <button
                    onClick={() => setIsPersonal(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-sans text-sm font-medium transition-all ${
                      isPersonal ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Personal Experience
                  </button>
                </div>

                {/* From */}
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">From</label>
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Your name"
                    maxLength={50}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>

                {/* To — searchable (only if not personal) */}
                {!isPersonal && (
                  <div className="relative">
                    <label className="block text-sm font-sans font-medium text-foreground mb-2">To</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={to || search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setTo("");
                          setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="Search for a classmate..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      />
                    </div>
                    <AnimatePresence>
                      {showDropdown && !to && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto rounded-xl glass-strong border border-border"
                        >
                          {filtered.length > 0 ? (
                            filtered.map((name) => (
                              <button
                                key={name}
                                onClick={() => {
                                  setTo(name);
                                  setSearch("");
                                  setShowDropdown(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-foreground hover:bg-muted/60 font-sans text-sm transition-colors first:rounded-t-xl last:rounded-b-xl"
                              >
                                {name}
                              </button>
                            ))
                          ) : (
                            <p className="px-4 py-3 text-muted-foreground text-sm font-sans">No match found</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">
                    {isPersonal ? "Your Experience / Memory" : "Your Message"}
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
                    placeholder={isPersonal ? "Share a personal memory or experience from this year..." : "Write something they'll remember forever..."}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                  />
                  <p className="text-xs text-muted-foreground font-sans mt-1 text-right">
                    {message.length}/{MAX_CHARS}
                  </p>
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={!from.trim() || !message.trim() || (!isPersonal && !to.trim())}
                  className="w-full py-4 rounded-xl gradient-accent text-primary-foreground font-sans font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-pink"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  {isPersonal ? "Share My Experience ✨" : "Send with Love 💖"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoryForm;
