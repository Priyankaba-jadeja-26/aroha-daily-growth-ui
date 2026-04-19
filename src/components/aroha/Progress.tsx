import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type Props = { completed: number; total: number };

export const ProgressCard = ({ completed, total }: Props) => {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  const [animatedPct, setAnimatedPct] = useState(0);
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimatedPct(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  // count-up effect for the percentage label
  useEffect(() => {
    const start = displayPct;
    const diff = pct - start;
    if (diff === 0) return;
    const duration = 600;
    const startTime = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayPct(Math.round(start + diff * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct]);

  return (
    <section className="relative z-10 px-5 sm:px-8 animate-fade-up">
      <div className="glass-deep rounded-[24px] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sunrise shadow-soft animate-pulse-soft">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Today's Progress
              </p>
              <p className="font-display text-base font-semibold text-foreground">
                {completed}/{total} tasks completed
              </p>
            </div>
          </div>
          <span className="font-display text-2xl font-bold tabular-nums bg-sunrise bg-clip-text text-transparent">
            {displayPct}%
          </span>
        </div>

        <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/80 shadow-inner">
          <div
            className="relative h-full rounded-full bg-progress shadow-glow"
            style={{
              width: `${animatedPct}%`,
              transition: "width 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* shine sweep */}
            <div
              className="absolute inset-y-0 left-0 w-1/3 rounded-full animate-progress-shine"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.55), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
