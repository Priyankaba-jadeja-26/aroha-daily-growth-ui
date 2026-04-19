import { Sun, Moon, Sunrise } from "lucide-react";
import { useState, useEffect } from "react";

const getGreetingData = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good Morning", sub: "A fresh canvas awaits — breathe deep and begin gently.", Icon: Sunrise };
  if (h < 18) return { text: "Good Afternoon", sub: "Stay grounded. Small wins lead to great achievements.", Icon: Sun };
  return { text: "Good Evening", sub: "Soften your shoulders. You've carried enough today.", Icon: Moon };
};

const formattedDate = () =>
  new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

export const Greeting = () => {
  const { text, sub, Icon } = getGreetingData();

    const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  // Load name
  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) setName(saved);
    else setEditing(true); // first time → ask for name
  }, []);

  // Save name
  useEffect(() => {
    if (name) localStorage.setItem("username", name);
  }, [name]);

  return (
    <section className="relative z-10 px-5 sm:px-8 animate-fade-up">
      <div className="glass-deep relative overflow-hidden rounded-[28px] p-6 sm:p-8">

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-foreground/70 backdrop-blur">
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            {formattedDate()}
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {text},{" "}
            {editing ? (
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setEditing(false);
                }}
                placeholder="Enter your name"
                className="bg-transparent outline-none border-b border-muted text-foreground"
              />
            ) : (
              <span
                onClick={() => setEditing(true)}
                className="cursor-pointer font-semibold bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent"
              >
                {name || "Your Name"}
              </span>
            )}
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {sub}
          </p>
        </div>
      </div>
    </section>
  );
};
