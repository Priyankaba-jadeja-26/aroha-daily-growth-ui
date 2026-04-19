import { useMemo, useState } from "react";
import { Header } from "@/components/aroha/Header";
import { Greeting } from "@/components/aroha/Greeting";
import { Streak } from "@/components/aroha/Streak";
import { ProgressCard } from "@/components/aroha/Progress";
import { Tasks, type Task } from "@/components/aroha/Tasks";
import { Quote } from "@/components/aroha/Quote";
import { Reflection } from "@/components/aroha/Reflection";

const initialTasks: Task[] = [
  { id: "1", text: "10 minutes of mindful breathing", done: true },
  { id: "2", text: "Drink a glass of water", done: true },
  { id: "3", text: "Read 15 pages of a book", done: true },
  { id: "4", text: "Take a walk outside", done: false },
  { id: "5", text: "Plan tomorrow with intention", done: false },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const completed = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const add = (text: string) =>
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }]);

  return (
    <main className="aroha-bg min-h-screen">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-10">
        <Header />
        <Greeting />
        <Streak />
        <ProgressCard completed={completed} total={tasks.length} />
        <Tasks tasks={tasks} onToggle={toggle} onAdd={add} />
        <Quote />
        <Reflection />
      </div>
    </main>
  );
};

export default Index;
