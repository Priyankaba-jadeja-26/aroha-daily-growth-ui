import { useMemo } from "react";
import { Quote as QuoteIcon } from "lucide-react";

const quotes = [
  { text: "Small steps every day lead to big changes one year.", author: "Unknown" },
  { text: "You don't have to be extreme, just consistent.", author: "Unknown" },
  { text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  { text: "Bloom where you are planted.", author: "Mary Engelbreit" },
  { text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott" },
  { text: "Progress, not perfection.", author: "Unknown" },
];

export const Quote = () => {
  const q = useMemo(() => {
    const idx = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length;
    return quotes[idx];
  }, []);

  return (
    <section className="relative z-10 px-5 sm:px-8 animate-fade-up">
      <div className="glass-deep relative overflow-hidden rounded-[24px] p-5 sm:p-6">
        <QuoteIcon
          className="absolute -right-2 -top-2 h-24 w-24 text-foreground/[0.04]"
          strokeWidth={1.5}
        />
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Today's Inspiration
          </p>
          <p className="mt-2 font-display text-base font-medium leading-relaxed text-foreground sm:text-lg text-balance">
            "{q.text}"
          </p>
          <p className="mt-2 text-xs font-light text-muted-foreground">— {q.author}</p>
        </div>
      </div>
    </section>
  );
};
