import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useStreak = (session: Session | null) => {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const getLocalDate = () => {
    return new Date().toLocaleDateString("en-CA");
  };
  useEffect(() => {
    if (!session?.user){ 

      setStreak(0);
      setLongestStreak(0);
      setLastCompletedDate(null);
      return;
    }

    const loadStreak = async () => {
      const { data, error } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error && error.code !== "PGRST116") {
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

  const updateStreak = async () => {
    if (!session?.user) return;

    const today = getLocalDate();

    const { data: streakData, error: streakError } = await supabase
      .from("user_streaks")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (streakError && streakError.code !== "PGRST116") {
      console.error(streakError);
      return;
    }

    if (!streakData) {
      await supabase.from("user_streaks").insert({
        user_id: session.user.id,
        current_streak: 1,
        longest_streak: 1,
        last_completed_date: today,
      });

      setStreak(1);
      setLongestStreak(1);
      setLastCompletedDate(today);

      return;
    }

    const lastDate = streakData.last_completed_date;

    let newStreak = streakData.current_streak;

    if (lastDate !== today) {
      const last = new Date(lastDate);
      const current = new Date(today);

      const diffDays = Math.floor(
        (current.getTime() - last.getTime()) /
        (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }

    const longest = Math.max(
      streakData.longest_streak,
      newStreak
    );

    await supabase
      .from("user_streaks")
      .update({
        current_streak: newStreak,
        longest_streak: longest,
        last_completed_date: today,
      })
      .eq("user_id", session.user.id);


    setStreak(newStreak);
    setLongestStreak(longest);
    setLastCompletedDate(today);
  };

  
  return {
    streak,
    longestStreak,
    lastCompletedDate,
    warning: getStreakWarning(),

    updateStreak,

    setStreak,
    setLongestStreak,
    setLastCompletedDate,
  };
};