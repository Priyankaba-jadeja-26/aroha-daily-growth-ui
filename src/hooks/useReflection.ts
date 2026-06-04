import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type ReflectionHistory = {
    id: string;
    reflection_date: string;
    mood: string;
    reflection: string;
    ai_response: string | null;
    };

export const useReflection = (session: Session | null) => {
  const [reflection, setReflection] = useState("");
  const [mood, setMood] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [history, setHistory] = useState<ReflectionHistory[]>([]);

  const getToday = () => {
    return new Date().toLocaleDateString("en-CA");
  };

  useEffect(() => {
    if (!session?.user) {
      setReflection("");
      setMood("");
      setAiResponse("");
      return;
    }

    const loadReflectionData = async () => {
      const today = getToday();

      const { data, error } = await supabase
        .from("reflections")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("reflection_date", today)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error(error);
        return;
      }

      if (data) {
        setReflection(data.reflection);
        setMood(data.mood);
        setAiResponse(data.ai_response || "");
      }

      const { data: historyData, error: historyError } =
        await supabase
          .from("reflections")
          .select("*")
          .eq("user_id", session.user.id)
          .order("reflection_date", { ascending: false });

      if (historyError) {
        console.error(historyError);
        return;
      }

      setHistory(historyData || []);
    };

    loadReflectionData();
  }, [session]);

  const saveReflection = async (
    reflectionText: string,
    moodValue: string,
    aiValue: string
  ) => {
    if (!session?.user) return;

    const today = getToday();

    const { error } = await supabase
      .from("reflections")
      .upsert({
        user_id: session.user.id,
        reflection_date: today,
        mood: moodValue,
        reflection: reflectionText,
        ai_response: aiValue,
      });

    if (error) {
      console.error(error);
    }
  };

  return {
    reflection,
    setReflection,

    mood,
    setMood,

    aiResponse,
    setAiResponse,

    history,
    setHistory,

    saveReflection,
  };
};