import { useMemo, useState, useEffect } from "react";
import { Header } from "@/components/aroha/Header";
import { Greeting } from "@/components/aroha/Greeting";
import { Streak } from "@/components/aroha/Streak";
import { ProgressCard } from "@/components/aroha/Progress";
import { Tasks, type Task } from "@/components/aroha/Tasks";
import { Quote } from "@/components/aroha/Quote";
import { Reflection } from "@/components/aroha/Reflection";
import { SettingsModal } from "@/components/aroha/SettingsModal";


const initialTasks: Task[] = [
  { id: "1", text: "10 minutes of mindful breathing", done: false },
  { id: "2", text: "Drink a glass of water", done: false },
  { id: "3", text: "Read 15 pages of a book", done: false },
  { id: "4", text: "Take a walk outside", done: false },
  { id: "5", text: "Plan tomorrow with intention", done: false },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [streak, setStreak] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
//load task on start
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));

    const savedStreak = localStorage.getItem("streak");
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

const completed = useMemo(
  () => {
    const todayStr = new Date().toDateString();
    return tasks.filter(
    (t) => t.done && t.completedDate === todayStr
  ).length;
}, [tasks]);

  useEffect(() => {
    const todayStr = new Date().toDateString();
    const last = localStorage.getItem("lastCompletedDate");

    if (completed === 0) return; // no task done → do nothing

    if (!last) {
      setStreak(1);
      localStorage.setItem("lastCompletedDate", todayStr);
      return;
    }

    const lastDate = new Date(last);
    const currentDate = new Date();

    const diffDays =
      (currentDate.getTime() - lastDate.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diffDays === 0) {
      return; // already counted today
    }

    if (diffDays === 1) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1); // reset
    }

    localStorage.setItem("lastCompletedDate", todayStr);
  }, [completed]);

  // Save tasks on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("streak", String(streak));
  }, [streak]);

  useEffect(() => {
    let lastDate = new Date().toDateString();

  const interval = setInterval(() => {
    const currentDate = new Date().toDateString();

    if (currentDate !== lastDate) {
      lastDate = currentDate;
      setTasks((prev) => [...prev]); // trigger only on date change
    }
  }, 60000);

  return () => clearInterval(interval);
  }, []);

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done, completedDate: !t.done ? new Date().toDateString() : undefined, } : t))
    );

  const add = (text: string) =>
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }]);
  
  const remove = (id: string) =>
  setTasks((prev) => prev.filter((t) => t.id !== id));

  const resetTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  return (
    <main className="aroha-bg min-h-screen">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-10">
        <Header onSettingsClick={() => setSettingsOpen(true)} />
        <Greeting />
        <Streak days={streak} />
        <ProgressCard completed={completed} total={tasks.length} />
        <Tasks tasks={tasks} onToggle={toggle} onAdd={add} onDelete={remove} />
        <Quote />
        <Reflection />
      </div>
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onResetTasks={resetTasks}
      />
    </main>
  );
};

export default Index;
