import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useStreak = (session: Session | null) => {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    const loadStreak = async () => {
      const { data, error } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setStreak(data.current_streak);
        setLongestStreak(data.longest_streak);
        setLastCompletedDate(data.last_completed_date);
      }
    };

    loadStreak();
  }, [session]);

  const getStreakWarning = () => {
    if (!lastCompletedDate || streak === 0) {
      return null;
    }

    const today = new Date();
    const last = new Date(lastCompletedDate);

    const diffDays = Math.floor(
      (today.getTime() - last.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    if (diffDays >= 1) {
      return "You haven't completed any task today — don't break your streak.";
    }

    return null;
  };

  return {
    streak,
    longestStreak,
    lastCompletedDate,
    warning: getStreakWarning(),

    setStreak,
    setLongestStreak,
    setLastCompletedDate,
  };
};