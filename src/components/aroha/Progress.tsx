import { Sparkles } from "lucide-react";

type Props = { completed: number; total: number };

export const ProgressCard = ({ completed, total }: Props) => {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <section className="relative z-10 px-5 sm:px-8 animate-fade-up">
      <div className="glass rounded-[24px] p-5 sm:p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sunrise shadow-soft">
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
          <span className="font-display text-2xl font-semibold text-foreground">
            {pct}%
          </span>
        </div>

        <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-progress shadow-glow transition-smooth"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </section>
  );
};
