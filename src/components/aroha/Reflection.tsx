import { useState, useEffect } from "react";
import { Annoyed } from "lucide-react";

const moods = [
  { emoji: "😌", label: "Calm" },
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Meh" },
  { emoji: "😔", label: "Low" },
  { emoji: "😣", label: "Anxious" },
  { emoji: "🥱", label: "Tired" },
];

export const Reflection = () => {
  const [value, setValue] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ text: string; mood: string | null } | null>(null);

  const handleSave = () => {
  if (!value.trim()) return;

  const data = { text: value, mood };

  localStorage.setItem("reflection", JSON.stringify(data));
  setSaved(data);
  setValue("");
  setMood(null);
};

useEffect(() => {
  const stored = localStorage.getItem("reflection");
  if (stored) setSaved(JSON.parse(stored));
}, []);

  return (
    <section className="relative z-10 px-5 pb-10 sm:px-8 animate-fade-up">
      <div className="glass-deep rounded-[24px] p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sunrise shadow-soft">
            <Annoyed className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Daily Reflection
            </p>
            <p className="font-display text-base font-semibold text-foreground">
              How are you feeling today?
            </p>
          </div>
        </div>

        {/* Mood picker */}
        <div className="mb-4 flex flex-wrap gap-2">
          {moods.map((m) => {
            const active = mood === m.label;
            return (
              <button
                key={m.label}
                onClick={() => setMood(active ? null : m.label)}
                className={`group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-smooth hover:scale-105 ${
                  active
                    ? "border-transparent bg-sunrise text-white shadow-glow"
                    : "border-border bg-white/60 text-foreground/70 hover:text-foreground"
                }`}
                aria-pressed={active}
              >
                <span className={`text-base transition-smooth ${active ? "scale-110" : "group-hover:scale-110"}`}>
                  {m.emoji}
                </span>
                <span className="text-xs">{m.label}</span>
              </button>
            );
          })}
        </div>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your thoughts..."
          rows={5}
          className="w-full resize-none rounded-2xl border border-border bg-white/60 p-4 text-[15px] font-light leading-relaxed text-foreground outline-none transition-smooth placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:bg-white/80"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {value.length} characters{mood ? ` · feeling ${mood.toLowerCase()}` : ""}
          </span>
          <button
            onClick={handleSave}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-smooth hover:scale-105 hover:shadow-glow active:scale-95"
          >
            Save reflection
          </button>
        </div>

        {saved && (
          <div className="mt-4 rounded-2xl bg-white/60 p-4">
            <p className="text-xs text-muted-foreground mb-1">
              Saved reflection:
            </p>

            {saved.mood && (
              <p className="text-xs text-muted-foreground mb-1">
                Mood: {saved.mood}
              </p>
            )}

            <p className="text-sm text-foreground">
              {saved.text}
            </p>
          </div>
        )}

      </div>
      
    </section>
  );
};
