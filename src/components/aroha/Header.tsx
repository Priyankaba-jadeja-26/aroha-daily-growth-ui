import { Bell, Settings } from "lucide-react";
import { AromaLogo } from "./Logo";

export const Header = () => (
  <header className="relative z-10 flex items-center justify-between px-5 pt-6 pb-2 sm:px-8 sm:pt-8">
    <div className="flex items-center gap-3">
      <div className="animate-float">
        <AromaLogo size={52} />
      </div>
      <div className="flex flex-col leading-tight">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          <span className="bg-sunrise bg-clip-text text-transparent text-2xl">Aroha</span>
        </h1>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Grow a little, every day
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <button
        aria-label="Notifications"
        className="glass-deep relative flex h-11 w-11 items-center justify-center rounded-2xl text-foreground/70 transition-smooth hover:scale-105 hover:text-foreground"
      >
        <Bell className="h-5 w-5" strokeWidth={1.6} />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-sunrise shadow-glow animate-pulse-soft" />
      </button>
      <button
        aria-label="Settings"
        className="glass-deep flex h-11 w-11 items-center justify-center rounded-2xl text-foreground/70 transition-smooth hover:scale-105 hover:text-foreground"
      >
        <Settings className="h-5 w-5" strokeWidth={1.6} />
      </button>
    </div>
  </header>
);
