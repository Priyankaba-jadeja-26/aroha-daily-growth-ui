import { Sun } from "lucide-react";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
};

const formattedDate = () =>
  new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

export const Greeting = () => (
  <section className="relative z-10 px-5 sm:px-8 animate-fade-up">
    <div className="glass relative overflow-hidden rounded-[28px] p-6 sm:p-8 shadow-card">
      {/* decorative orb */}
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70 animate-float"
        style={{ background: "var(--gradient-sunrise)", filter: "blur(8px)" }}
      />
      <div className="relative">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-foreground/70 backdrop-blur">
          <Sun className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={2} />
          {formattedDate()}
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {getGreeting()}, <span className="bg-sunrise bg-clip-text text-transparent">Sage</span>
        </h2>
        <p className="mt-2 max-w-md text-sm font-light text-muted-foreground sm:text-base">
          A calm mind and small steps build a beautiful day. Let's begin.
        </p>
      </div>
    </div>
  </section>
);
