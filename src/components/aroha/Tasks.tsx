import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

export type Task = { id: string; text: string; done: boolean; completedDate?: string; };

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
};

export const Tasks = ({ tasks, onToggle, onAdd, onDelete }: Props) => {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const submit = () => {
    const v = draft.trim();
    if (!v) return setAdding(false);
    onAdd(v);
    setDraft("");
    setAdding(false);
  };

  return (
    <section className="relative z-10 px-5 sm:px-8 animate-fade-up">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Today's Tasks
        </h3>
        <button
          onClick={() => setAdding(true)}
          className="group flex items-center gap-1.5 rounded-full bg-sunrise px-4 py-2 text-sm font-medium text-white shadow-glow transition-smooth hover:scale-105"
          aria-label="Add task"
        >
          <Plus className="h-4 w-4 transition-smooth group-hover:rotate-90" strokeWidth={2.4} />
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-2.5">
        {tasks.map((t) => (
          <li key={t.id} className="animate-fade-up">
            <div className="glass-deep group flex items-center gap-3 rounded-2xl p-4 transition-smooth hover:scale-[1.01] hover:shadow-glow active:scale-[0.99]">
              
              {/* TOGGLE BUTTON */}
              <button
                onClick={() => onToggle(t.id)}
                className="flex items-center gap-3 flex-1 text-left"
              >
                <span
                  className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                    t.done
                      ? "border-transparent bg-sunrise shadow-glow scale-105"
                      : "border-border bg-white/60 group-hover:border-foreground/40 group-hover:scale-110"
                  }`}
                >
                  {t.done && (
                    <Check
                      className="h-3.5 w-3.5 text-white animate-check-pop"
                      strokeWidth={3}
                    />
                  )}
                </span>

                <span
                  className={`flex-1 text-[15px] transition-all duration-300 ${
                    t.done
                      ? "text-muted-foreground line-through opacity-70"
                      : "font-medium text-foreground"
                  }`}
                >
                  {t.text}
                </span>
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => {if (confirm("Delete this task?")) onDelete(t.id);}}
                className="text-muted-foreground hover:text-red-500 transition"
              >
                <button
                  onClick={() => onDelete(t.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition"
                  aria-label="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </button>

            </div>
          </li>
        ))}

        {adding && (
          <li className="glass flex items-center gap-3 rounded-2xl p-4 shadow-soft animate-fade-up">
            <span className="h-6 w-6 shrink-0 rounded-lg border border-dashed border-foreground/30" />
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={submit}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
                if (e.key === "Escape") {
                  setDraft("");
                  setAdding(false);
                }
              }}
              placeholder="What's on your mind?"
              className="flex-1 bg-transparent text-[15px] font-medium text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground"
            />
          </li>
        )}
      </ul>
    </section>
  );
};
