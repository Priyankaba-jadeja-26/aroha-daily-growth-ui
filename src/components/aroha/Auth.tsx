import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful!");
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
    }
  };

  return (
    <section className="px-5 sm:px-8">
      <div className="glass-deep rounded-3xl p-6 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome to Aroha
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            Continue your growth journey.
          </p>
        </div>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-2xl border border-border bg-white/60 px-4 py-3 outline-none"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-2xl border border-border bg-white/60 px-4 py-3 outline-none"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSignup}
            className="flex-1 rounded-2xl bg-black text-white py-3 transition hover:opacity-90"
          >
            Sign Up
          </button>

          <button
            onClick={handleLogin}
            className="flex-1 rounded-2xl bg-blue-500 text-white py-3 transition hover:opacity-90"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};