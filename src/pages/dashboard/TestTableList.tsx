import { BookOpen, Edit2, Eye, Search, Trash2 } from "lucide-react";
import React from "react";
import Spinner from "../../components/ui/Loader";

interface TestTableListProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  loading: boolean;
  filteredTests: any[]; // Replace 'any[]' with the actual type if available
}

export default function TestTableList({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  loading,
  filteredTests,
}: TestTableListProps) {
  return (
    <>
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
      <div className="bg-white rounded-lg border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] tracking-wider font-medium text-slate-400 uppercase">
                <th className="py-4 px-6">Test Name</th>
                <th className="py-4 px-6">Subject</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Created Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full divide-y divide-slate-100 text-sm text-slate-600">
              {loading ? (
                <div className="w-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <tr
                    key={test.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {test.name}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-slate-700">
                          {test.subject}
                        </span>
                      </div>
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
                        {test.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-400 text-xs">
                      {new Date(test.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Column 6: Action Buttons Matrix */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          // onClick={() => onViewTest(test.id)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Preview Test"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          // onClick={() => onEditTest(test.id)}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                          title="Edit Parameters"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          // onClick={() => handleDelete(test.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete Archive"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-400 font-medium"
                  >
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
