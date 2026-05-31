import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Task } from "@/components/aroha/Tasks";

export const useTasks = (session: Session | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!session?.user) {
      setTasks([]);
      return;
    }

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

  const addTask = async (text: string) => {
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

  const removeTask = async (id: string) => {
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

  const toggleTask = async (
    id: string,
    updateStreak: () => Promise<void>
  ) => {
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

    if (updatedDone) {
      await updateStreak();
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

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    toggleTask,
  };
};

