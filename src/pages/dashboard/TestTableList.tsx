import { BookOpen, Edit2, Eye, Search, Trash2 } from "lucide-react";
import type { Subject, Test } from "../../types";
import Spinner from "../../components/ui/Loader";

interface TestTableListProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  loading: boolean;
  deletingId: string | null;
  filteredTests: Test[];
  subjects?: Subject[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TestTableList({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  loading,
  deletingId,
  filteredTests,
  subjects,
  onView,
  onEdit,
  onDelete,
}: TestTableListProps) {
  return (
    <>
      {/* Search + filter bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by test name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-400 rounded-lg text-sm transition-all outline-none text-slate-700"
          />
        </div>

        <div className="flex bg-slate-50 p-1 rounded-lg w-full sm:w-auto">
          {["All", "Published", "Draft", "Scheduled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === status
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-auto max-h-135 custom-scrollbar">
          <table className="w-full text-left border-collapse relative">
            <thead>
              <tr className="sticky top-0 bg-slate-50 border-b border-slate-100 text-[11px] tracking-wider font-medium text-slate-400 uppercase z-10 shadow-[0_1px_0_0_rgba(241,245,249,1)]">
                <th className="py-4 px-6 bg-slate-50">Test Name</th>
                <th className="py-4 px-6 bg-slate-50">Subject</th>
                <th className="py-4 px-6 bg-slate-50">Status</th>
                <th className="py-4 px-6 bg-slate-50">Created Date</th>
                <th className="py-4 px-6 bg-slate-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <tr
                    key={test.id}
                    className="hover:bg-slate-50/60 transition-colors bg-white"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {test.name}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">
                      {subjects?.find((s) => s.id === test.subject)?.name ||
                        test.subject}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          test.status === "live"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : test.status === "draft"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}
                      >
                        {test.status ?? "unknown"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs">
                      {new Date(test.created_at ?? "").toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onView(test.id ?? "")}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => onEdit(test.id ?? "")}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(test.id ?? "")}
                          disabled={deletingId === test.id}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all disabled:opacity-40"
                        >
                          {deletingId === test.id ? (
                            <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <BookOpen
                      size={36}
                      className="mx-auto text-slate-300 mb-2"
                    />
                    No assessments found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
