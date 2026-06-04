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

type ReflectionProps = {
  reflection: string;
  setReflection: (value: string) => void;

  mood: string;
  setMood: (value: string) => void;

  aiResponse: string;
  setAiResponse: (value: string) => void;

  saveReflection: (
    reflectionText: string,
    moodValue: string,
    aiValue: string
  ) => Promise<void>;
};

export const Reflection = ({
  reflection,
  setReflection,
  mood,
  setMood,
  aiResponse,
  setAiResponse,
  saveReflection,
}: ReflectionProps) => {
  const [justSaved, setJustSaved] = useState(false);

  const generateResponse = (text: string, mood: string | null) => {
  const lower = text.toLowerCase();

  if (mood === "Anxious") {
    return "Take a deep breath. You're safe. Try focusing on what you can control right now.";
  }

  if (mood === "Low") {
    return "It's okay to feel low. You don’t need to fix everything today. Just take one small step.";
  }

  if (mood === "Happy") {
    return "That's amazing! Capture this moment and carry this energy forward.";
  }

  if (lower.includes("tired")) {
    return "Your body might be asking for rest. Recharge before pushing further.";
  }

  if (lower.includes("stress") || lower.includes("pressure")) {
    return "Pause for a moment. Even 5 minutes of stillness can reset your mind.";
  }

    return "You're doing better than you think. Keep going.";
};

  const handleSave = async () => {
    if (!reflection.trim()) return;

    const ai = generateResponse(reflection, mood);

    setAiResponse(ai);

    await saveReflection(
      reflection,
      mood,
      ai
    );
    
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  };

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
                onClick={() => setMood(active ? "" : m.label)}
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
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your thoughts..."
          rows={5}
          className="w-full resize-none rounded-2xl border border-border bg-white/60 p-4 text-[15px] font-light leading-relaxed text-foreground outline-none transition-smooth placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:bg-white/80"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {reflection.length} characters{mood ? ` · feeling ${mood.toLowerCase()}` : ""}
          </span>
          <button
            onClick={handleSave}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-smooth hover:scale-105 hover:shadow-glow active:scale-95"
          >
            Save reflection
          </button>
        </div>
        
        {justSaved && (
          <p className="text-xs text-green-500 mt-2">
            Saved successfully ✓
          </p>
        )}

        {reflection ? (
          <div className="mt-6 border-t border-border/40 pt-4">
            <div className="rounded-2xl bg-white/60 p-4 border border-border shadow-soft backdrop-blur">
              <div className="mt-5 rounded-2xl border border-border bg-white/0 p-4 shadow-soft backdrop-blur">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground mb-2">
                  Saved Reflection
                </p>

                {mood && (
                  <p className="text-xs text-muted-foreground mb-1">
                    Mood:{" "}
                    <span className="font-medium text-foreground">
                      {mood}
                    </span>
                  </p>
                )}

                <p className="text-sm text-foreground leading-relaxed">
                  {reflection}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground mt-3">
            No reflection saved yet.
          </p>
        )}

         {aiResponse && (
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-pink-100 to-orange-100 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              Aroha Insight
            </p>
            <p className="text-sm text-foreground">
              {aiResponse}
            </p>
          </div>
        )}
      </div>
          
    </section>
  );
};
