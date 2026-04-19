import { Flame } from "lucide-react";

type Props = { days?: number; weekDots?: boolean[] };

export const Streak = ({
  days = 12,
  weekDots = [true, true, true, false, true, true, false],
}: Props) => {
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <section className="relative z-10 px-5 sm:px-8 animate-fade-up">
      <div className="glass-deep rounded-[24px] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-sunrise shadow-glow animate-pulse-soft">
              <Flame
                className="h-6 w-6 text-white animate-flame-flicker"
                strokeWidth={2}
                fill="currentColor"
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Current Streak
              </p>
              <p className="font-display text-xl font-semibold text-foreground">
                {days} <span className="text-base font-medium text-muted-foreground">days</span>
              </p>
            </div>
          </div>

          <div className="flex items-end gap-1.5">
            {weekDots.map((on, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span
                  className={`h-7 w-2.5 rounded-full transition-smooth ${
                    on
                      ? "bg-sunrise shadow-glow"
                      : "bg-muted"
                  }`}
                />
                <span className="text-[10px] font-medium text-muted-foreground">
                  {labels[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
