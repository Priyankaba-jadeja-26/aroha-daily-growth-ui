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

  return {
    tasks,
    setTasks,
    addTask,
  };
};