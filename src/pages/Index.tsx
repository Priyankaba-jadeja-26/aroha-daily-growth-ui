import { useMemo, useState, useEffect } from "react";
import { Header } from "@/components/aroha/Header";
import { Greeting } from "@/components/aroha/Greeting";
import { Streak } from "@/components/aroha/Streak";
import { ProgressCard } from "@/components/aroha/Progress";
import { Tasks, type Task } from "@/components/aroha/Tasks";
import { Quote } from "@/components/aroha/Quote";
import { Reflection } from "@/components/aroha/Reflection";
import { SettingsModal } from "@/components/aroha/SettingsModal";
import { Auth } from "@/components/aroha/Auth";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [streak, setStreak] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
//load task on start


  useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return () => subscription.unsubscribe();
}, []);

useEffect(() => {
  if (!session?.user) return;

  const loadTasks = async () => {
    const { data, error } = await supabase
      .from("task")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setTasks(data || []);
  };

  loadTasks();
}, [session]);

const handleLogout = async () => {
  await supabase.auth.signOut();
};

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

    const diffDays = Math.floor(
      (currentDate.getTime() - lastDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );
      

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

  const toggle = async (id: string) => {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    const updatedDone = !task.done;
    const updatedDate = updatedDone
      ? new Date().toDateString()
      : null;

    const { error } = await supabase
      .from("task")
      .update({
        done: updatedDone,
        completedDate: updatedDate,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: updatedDone,
              completedDate: updatedDate || undefined,
            }
          : t
      )
    );
  };

  const add = async (text: string) => {
    if (!session?.user) return;

    const newTask = {
      text,
      done: false,
      user_id: session.user.id,
    };

    const { data, error } = await supabase
      .from("task")
      .insert([newTask])
      .select();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setTasks((prev) => [...prev, ...data]);
    }
  };
  
  const remove = async (id: string) => {
    const { error } = await supabase
      .from("task")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const resetTasks = () => {
    setTasks([]);
    localStorage.removeItem("lastCompletedDate");
    setStreak(0);
  };

  const getStreakWarning = () => {
    const todayStr = new Date().toDateString();
    const last = localStorage.getItem("lastCompletedDate");

    if (!last) return null;
    if (last === todayStr) return null;

    if (streak > 0) {
      return "You haven't completed any task today — don’t break your streak.";
    }

    return null;
  };

  const getSmartSuggestion = () => {
    const savedReflection = localStorage.getItem("reflection");
    const mood = savedReflection ? JSON.parse(savedReflection).mood : null;

    if (completed === 0) {
      if (mood === "Low") return "Start very small today. Even 1 task is a win.";
      if (mood === "Anxious") return "Pause and take one calming action first.";
      if (streak >= 3) return "Don’t break your streak. Just complete one task.";
      return "Start your day with one simple action.";
    }

    if (completed === 1 && tasks.length > 2) {
      return "Good start. Build momentum with one more task.";
    }

    if (completed > 0 && completed < tasks.length) {
      return "Good progress. Try completing one more task.";
    }

    if (completed === tasks.length && tasks.length > 0) {
      return "You showed discipline today. That’s powerful.";
    }

    if (streak >= 3) {
      return "You’re on a streak. Don’t break it now.";
    }

    return "Keep going, you’re making progress.";
  };

  const getDailyInsight = () => {
    if (completed === 0 && streak > 0) { // ✅ fixed
      return "You’re close to breaking your streak. Show up today.";
    }

    if (completed > 0 && completed < tasks.length) {
      return "Progress matters more than perfection.";
    }

    if (completed === tasks.length && tasks.length > 0) {
      return "You completed everything today. That’s rare consistency.";
    }

    if (streak >= 5) {
      return "You’re building discipline, not just motivation.";
    }

    if (streak === 0) {
      return "Every strong routine starts with one day.";
    }

    return "Keep showing up daily. That’s how growth happens.";
  };

  const warning = getStreakWarning();
  const insight = getDailyInsight();   
  const suggestion = getSmartSuggestion();
  
  return (
    <main className="aroha-bg min-h-screen">
      {!session ? (
        <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-10">
          <Header onSettingsClick={() => setSettingsOpen(true)} />
          <Auth />
        </div>
      ) : (
        <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-10">
          <Header onSettingsClick={() => setSettingsOpen(true)} />

          <Greeting />
          <Streak days={streak} />

          {warning && (
            <div className="px-5 sm:px-8">
              <div className="rounded-2xl bg-yellow-100/80 border border-yellow-200 p-4 shadow-soft animate-pulse">
                <p className="text-xs font-semibold text-yellow-700 mb-1">
                  Reminder
                </p>

                <p className="text-sm text-foreground">
                  {warning}
                </p>
              </div>
            </div>
          )}

          {suggestion && (
            <div className="px-5 sm:px-8">
              <div className="rounded-2xl bg-blue-100/80 border border-blue-200 p-4 shadow-soft">
                <p className="text-xs font-semibold text-blue-700 mb-1">
                  Suggestion
                </p>

                <p className="text-sm text-foreground">
                  {suggestion}
                </p>
              </div>
            </div>
          )}

          {insight && (
            <div className="px-5 sm:px-8">
              <div className="rounded-2xl bg-purple-100/80 border border-purple-200 p-4 shadow-soft">
                <p className="text-xs font-semibold text-purple-700 mb-1">
                  Insight
                </p>

                <p className="text-sm text-foreground">
                  {insight}
                </p>
              </div>
            </div>
          )}

          <ProgressCard completed={completed} total={tasks.length} />

          <Tasks
            tasks={tasks}
            onToggle={toggle}
            onAdd={add}
            onDelete={remove}
          />

          <Quote />
          <Reflection />

          <button
            onClick={handleLogout}
            className="mx-auto mb-6 w-56 rounded-3xl bg-gradient-to-r from-pink-100/70 to-orange-100/70 border border-white/40 py-3 text-base font-bold tracking-widest text-[#b85c78] shadow-soft backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.01] hover:opacity-90"
          >
            Sign out
          </button>
          
        </div>
      )}

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onResetTasks={resetTasks}
      />
    </main>
  );
};

export default Index;
