import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onResetTasks: () => void;
};

export const SettingsModal = ({ open, onClose, onResetTasks }: Props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) setName(saved);
  }, []);

  const saveName = () => {
    localStorage.setItem("username", name);
    onClose();
    window.location.reload(); // quick refresh
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="glass-deep w-[90%] max-w-md rounded-2xl p-6">
        
        <h2 className="text-lg font-semibold mb-4">Settings ⚙️</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-muted-foreground">Your Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent outline-none"
          />
        </div>

        {/* Reset Tasks */}
        <button
          onClick={onResetTasks}
          className="w-full mb-3 rounded-lg bg-red-500 text-white py-2"
        >
          Reset Tasks
        </button>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={saveName}
            className="px-4 py-2 bg-sunrise text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};