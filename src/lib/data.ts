export function getRegisteredNames(): string[] {
  try {
    return JSON.parse(localStorage.getItem("farewell-names") || "[]");
  } catch { return []; }
}

export function registerName(name: string): string[] {
  const names = getRegisteredNames();
  const trimmed = name.trim();
  if (trimmed && !names.includes(trimmed)) {
    names.push(trimmed);
    names.sort((a, b) => a.localeCompare(b));
    localStorage.setItem("farewell-names", JSON.stringify(names));
  }
  return names;
}

export const friendshipQuotes = [
  "We didn't realize we were making memories, we just knew we were having fun.",
  "Some people arrive and make such a beautiful impact on your life, you can barely remember what life was like without them.",
  "It's not about who you've known the longest. It's about who walked into your life and said 'I'm here for you' and proved it.",
  "The most beautiful discovery true friends make is that they can grow separately without growing apart.",
  "We'll always be friends because you know too much. 😂",
  "A good friend knows all your best stories. A best friend has lived them with you.",
  "Friends are the family you choose.",
  "Growing up is hard. But it's easier when you've got the best people beside you.",
  "Class 11th wasn't just a year — it was a whole chapter of who we're becoming.",
  "Remember when we thought homework was our biggest problem? Those were the days.",
  "I don't know what the future holds, but I know who I want in it.",
  "Distance means nothing when someone means everything.",
  "One day, we'll look back at this and realize it was the best time of our lives.",
  "To the nights that turned into mornings, and the friends that turned into family.",
  "Thank you for being the kind of friend I always prayed for.",
  "Some bonds don't need daily conversations. They just survive on loyalty and love.",
  "We survived school, we can survive anything.",
  "I will forever be grateful for every second I spent with you all.",
  "These memories? No one can ever take them from us.",
  "Here's to the ones who made ordinary days extraordinary."
];

export interface Memory {
  id: string;
  from: string;
  to: string;
  message: string;
  isPersonal?: boolean;
  timestamp: number;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  dob: string; // ISO date string
  email?: string;
  social?: string;
  city?: string;
  classmatesOnly: boolean;
  timestamp: number;
}

export function getMemories(): Memory[] {
  try {
    return JSON.parse(localStorage.getItem("farewell-memories") || "[]");
  } catch { return []; }
}

export function saveMemory(memory: Omit<Memory, "id" | "timestamp">): Memory {
  const memories = getMemories();
  const newMemory: Memory = {
    ...memory,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  memories.unshift(newMemory);
  localStorage.setItem("farewell-memories", JSON.stringify(memories));
  return newMemory;
}

export function deleteMemory(id: string): Memory[] {
  const memories = getMemories().filter((m) => m.id !== id);
  localStorage.setItem("farewell-memories", JSON.stringify(memories));
  return memories;
}

export function getNextBirthday(contacts: Contact[]): { contact: Contact; daysUntil: number } | null {
  if (contacts.length === 0) return null;
  const today = new Date();
  let nearest: { contact: Contact; daysUntil: number } | null = null;

  for (const c of contacts) {
    if (!c.dob) continue;
    const dob = new Date(c.dob);
    const nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diff = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (!nearest || diff < nearest.daysUntil) {
      nearest = { contact: c, daysUntil: diff };
    }
  }
  return nearest;
}

export const birthdayQuotes = [
  "Another year older, another year of amazing memories together! 🎂",
  "Birthdays come and go, but the memories we share last forever! 🎉",
  "Here's to another trip around the sun with an incredible person! 🌟",
  "May your birthday be as wonderful as you've made our school days! 🎈",
  "Growing up is optional, but growing together is beautiful! 🎁",
  "Wishing you all the happiness your heart can hold! 💖",
];

export function getContacts(): Contact[] {
  try {
    return JSON.parse(localStorage.getItem("farewell-contacts") || "[]");
  } catch { return []; }
}

export function saveContact(contact: Omit<Contact, "id" | "timestamp">): Contact {
  const contacts = getContacts();
  const newContact: Contact = {
    ...contact,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  contacts.unshift(newContact);
  localStorage.setItem("farewell-contacts", JSON.stringify(contacts));
  return newContact;
}
