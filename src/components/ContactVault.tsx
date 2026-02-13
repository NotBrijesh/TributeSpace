import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Copy, Check, Search, Shield, User, AtSign } from "lucide-react";
import { classmates, saveContact, getContacts, type Contact } from "@/lib/data";
import confetti from "canvas-confetti";

const ContactVault = () => {
  const [contacts, setContacts] = useState<Contact[]>(getContacts());
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState("");
  const [city, setCity] = useState("");
  const [classmatesOnly, setClassmatesOnly] = useState(true);

  const filtered = useMemo(() => {
    if (!search.trim()) return contacts;
    const q = search.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.city && c.city.toLowerCase().includes(q))
    );
  }, [contacts, search]);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) return;
    const newContact = saveContact({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      social: social.trim() || undefined,
      city: city.trim() || undefined,
      classmatesOnly,
    });
    setContacts([newContact, ...contacts]);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 }, colors: ["#e8a0bf", "#b4a7d6", "#9fc5e8"] });
    setName(""); setPhone(""); setEmail(""); setSocial(""); setCity("");
    setShowForm(false);
  };

  const copyNumber = (id: string, phoneNum: string) => {
    navigator.clipboard.writeText(phoneNum);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            No Matter Where Life Takes Us…
            <br />
            <span className="gradient-text italic">Let's Stay Connected.</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            Years may pass and cities may change — but the people we grew up with
            should always be one message away.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-accent text-primary-foreground font-sans font-semibold glow-sky"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <User className="w-4 h-4" />
            {showForm ? "Close Form" : "Add Your Contact ☎️"}
          </motion.button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or city..."
              className="w-full pl-11 pr-4 py-3 rounded-xl glass border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>

        {/* Add contact form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="glass rounded-2xl p-6 md:p-8 space-y-4 max-w-lg mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1">Full Name *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={50}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1">Phone Number *</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." maxLength={15}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1">Email (optional)</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" maxLength={100}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-1">Social Handle (optional)</label>
                    <input value={social} onChange={(e) => setSocial(e.target.value)} placeholder="@yourhandle" maxLength={50}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-1">Current City (optional)</label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Where are you now?" maxLength={50}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                </div>

                {/* Privacy toggle */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <Shield className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-sans font-medium text-foreground">Visible only to classmates</p>
                    <p className="text-xs text-muted-foreground font-sans">Your phone number won't be publicly exposed.</p>
                  </div>
                  <button
                    onClick={() => setClassmatesOnly(!classmatesOnly)}
                    className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                      classmatesOnly ? "bg-primary" : "bg-muted"
                    } relative`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow transition-transform duration-300 ${
                        classmatesOnly ? "left-6" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={!name.trim() || !phone.trim()}
                  className="w-full py-3 rounded-xl gradient-accent text-primary-foreground font-sans font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save My Contact 🤝
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.4) }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-5 space-y-3"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">{contact.name}</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-sans">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <a href={`tel:${contact.phone}`} className="text-foreground hover:text-primary transition-colors">
                    {contact.phone}
                  </a>
                  <button
                    onClick={() => copyNumber(contact.id, contact.phone)}
                    className="ml-auto p-1.5 rounded-lg hover:bg-muted/60 transition-colors"
                  >
                    {copied === contact.id ? (
                      <Check className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm font-sans">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    <span className="text-foreground/80 truncate">{contact.email}</span>
                  </div>
                )}
                {contact.social && (
                  <div className="flex items-center gap-2 text-sm font-sans">
                    <AtSign className="w-3.5 h-3.5 text-lavender" />
                    <span className="text-foreground/80">{contact.social}</span>
                  </div>
                )}
                {contact.city && (
                  <div className="flex items-center gap-2 text-sm font-sans">
                    <MapPin className="w-3.5 h-3.5 text-warm" />
                    <span className="text-foreground/80">{contact.city}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {contacts.length === 0 && (
          <p className="text-center text-muted-foreground font-sans mt-8">
            Be the first to add your contact! 🌟
          </p>
        )}
      </div>
    </section>
  );
};

export default ContactVault;
