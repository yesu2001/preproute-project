import { Plus } from "lucide-react";
import React from "react";

interface DashboardHeaderProps {
  onCreateNewTest: () => void;
}

export default function DashboardHeader({
  onCreateNewTest,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 className="font-medium text-lg text-slate-800">Dashboard</h1>

      <button
        onClick={onCreateNewTest}
        className="flex items-center justify-center gap-2 px-3 py-2 bg-[#4E73F8] hover:bg-[#3B62E3] text-white font-medium text-sm rounded-lg cursor-pointer shadow-sm transition-all"
      >
        <Plus size={18} /> Create New Test
      </button>
    </div>
  );
}
