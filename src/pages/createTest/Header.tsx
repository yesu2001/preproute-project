export default function Header() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-md text-slate-600">
          Test Creation <span className="text-slate-600">/</span>
          Create Test <span className="text-slate-600">/</span>
          Chapter Wise
        </div>
      </header>

      <div className="w-fit flex gap-6 mb-8 border border-slate-200 rounded-xl p-2">
        {["Chapter Wise", "PYQ", "Mock Test"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${tab === "Chapter Wise" ? "text-[#4E73F8] bg-blue-50 font-medium" : "bg-white text-slate-400"}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
