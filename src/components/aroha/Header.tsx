import { Bell, Settings } from "lucide-react";
import { AromaLogo } from "./Logo";

export const Header = () => (
  <header className="relative z-10 flex items-center justify-between px-5 pt-6 pb-4 sm:px-8 sm:pt-8">
    <div className="flex items-center gap-3">
      <AromaLogo size={48} />
      <div className="flex flex-col leading-tight">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Aroha
        </h1>
        <p className="text-xs font-light text-muted-foreground">
          Grow a little, every day.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <button
        aria-label="Notifications"
        className="glass flex h-11 w-11 items-center justify-center rounded-2xl text-foreground/70 shadow-soft transition-smooth hover:scale-105 hover:text-foreground"
      >
        <Bell className="h-5 w-5" strokeWidth={1.6} />
      </button>
      <button
        aria-label="Settings"
        className="glass flex h-11 w-11 items-center justify-center rounded-2xl text-foreground/70 shadow-soft transition-smooth hover:scale-105 hover:text-foreground"
      >
        <Settings className="h-5 w-5" strokeWidth={1.6} />
      </button>
    </div>
  </header>
);
