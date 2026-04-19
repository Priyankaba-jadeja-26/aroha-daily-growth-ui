import { Sun, Moon, Sunrise } from "lucide-react";

const getGreetingData = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good Morning", sub: "A fresh canvas awaits — breathe deep and begin gently.", Icon: Sunrise };
  if (h < 18) return { text: "Good Afternoon", sub: "Stay grounded. Small wins are still wins.", Icon: Sun };
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
  return (
    <section className="relative z-10 px-5 sm:px-8 animate-fade-up">
      <div className="glass-deep relative overflow-hidden rounded-[28px] p-6 sm:p-8">
        {/* decorative orbs */}
        <div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70 animate-float"
          style={{ background: "var(--gradient-sunrise)", filter: "blur(8px)" }}
        />
        <div
          className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full opacity-50 animate-float"
          style={{ background: "var(--gradient-soft)", filter: "blur(12px)", animationDelay: "-3s" }}
        />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-foreground/70 backdrop-blur">
            <Icon className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={2} />
            {formattedDate()}
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {text}, <span className="bg-sunrise bg-clip-text text-transparent">Sage</span>
          </h2>
          <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-muted-foreground sm:text-base text-balance">
            {sub}
          </p>
        </div>
      </div>
    </section>
  );
};
