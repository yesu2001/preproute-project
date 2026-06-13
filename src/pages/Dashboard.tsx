import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTests, updateTest } from "../api/tests";
import { useTestStore } from "../store/testStore";
import { useAuthStore } from "../store/authStore";
import type { Test } from "../types";
import { Plus, Search, Edit2, Trash2, Eye, BookOpen } from "lucide-react";
import Spinner from "../components/ui/Loader";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Delete Handler
  // const handleDelete = (id: any) => {
  //   if (window.confirm("Are you sure you want to delete this test?")) {
  //     setTests(tests.filter((test) => test.id !== id));
  //   }
  // };

  // Filter Logic
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Published" && test.status === "live") ||
      (statusFilter === "Draft" && test.status === "draft");
    return matchesSearch && matchesStatus;
  });

  // Create test Navigate
  const onCreateNewTest = () => navigate("/test/create");

  // const { tests, setTests } = useTestStore();
  // const logout = useAuthStore((state) => state.logout);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [deletingId, setDeletingId] = useState<string | null>(null);
  // const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    // setError(null);
    try {
      // const res = await getAllTests();
      // setTests(res.data);
      setTests(filteredTests);
    } catch {
      // setError("Failed to load tests. Please try again.");
      console.log("Failed to load tests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (id: string) => {
  //   if (!confirm("Are you sure you want to delete this test?")) return;
  //   setDeletingId(id);
  //   try {
  //     await updateTest(id, { status: null });
  //     setTests(tests.filter((t) => t.id !== id));
  //   } catch {
  //     alert("Failed to delete test.");
  //   } finally {
  //     setDeletingId(null);
  //   }
  // };

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  // const filtered = tests.filter((t) =>
  //   t.name.toLowerCase().includes(search.toLowerCase()),
  // );

  // const getStatusStyle = (status: Test["status"]) => {
  //   if (status === "live")
  //     return "bg-green-50 text-green-700 border border-green-200";
  //   if (status === "draft")
  //     return "bg-yellow-50 text-yellow-700 border border-yellow-200";
  //   return "bg-gray-50 text-gray-500 border border-gray-200";
  // };

  return (
    <div className="p-2 md:p-6 max-w-7xl w-full mx-auto flex-1 space-y-6">
      {/* Dashboard Dynamic Row Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="font-medium text-lg text-slate-800">Dashboard</h1>

        <button
          onClick={onCreateNewTest}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-[#4E73F8] hover:bg-[#3B62E3] text-white font-medium text-sm rounded-lg shadow-sm transition-all"
        >
          <Plus size={18} /> Create New Test
        </button>
      </div>

      {/* SEARCH, FILTER & UTILITIES CONTROLS BAR */}
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
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {loading ? (
                <Spinner />
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
                      {new Date(test.date).toLocaleDateString("en-US", {
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
    </div>
  );
}

//     {/* Search */}
//     <div className="mb-4">
//       <input
//         type="text"
//         placeholder="Search tests..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//       />
//     </div>

//     {/* Error */}
//     {error && (
//       <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
//         {error}
//       </div>
//     )}

//     {/* Loading */}
//     {loading ? (
//       <div className="flex items-center justify-center py-24">
//         <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     ) : filtered.length === 0 ? (
//       <div className="text-center py-24 text-gray-400">
//         <p className="text-lg font-medium">No tests found</p>
//         <p className="text-sm mt-1">
//           {search
//             ? "Try a different search term"
//             : "Create your first test to get started"}
//         </p>
//       </div>
//     ) : (
//       /* Table */
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-gray-100 bg-gray-50">
//               <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
//                 Test Name
//               </th>
//               <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
//                 Subject
//               </th>
//               <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
//                 Questions
//               </th>
//               <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
//                 Status
//               </th>
//               <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
//                 Created
//               </th>
//               <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filtered.map((test) => (
//               <tr key={test.id} className="hover:bg-gray-50 transition">
//                 <td className="px-5 py-4 font-medium text-gray-900">
//                   {test.name}
//                 </td>
//                 <td className="px-5 py-4 text-gray-500">{test.subject}</td>
//                 <td className="px-5 py-4 text-gray-500">
//                   {test.questions?.length ?? 0}
//                 </td>
//                 <td className="px-5 py-4">
//                   <span
//                     className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(test.status)}`}
//                   >
//                     {test.status ?? "unknown"}
//                   </span>
//                 </td>
//                 <td className="px-5 py-4 text-gray-400">
//                   {new Date(test.created_at).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </td>
//                 <td className="px-5 py-4">
//                   <div className="flex items-center justify-end gap-2">
//                     <button
//                       onClick={() => navigate(`/test/${test.id}/preview`)}
//                       className="text-xs text-gray-500 hover:text-blue-600 px-2.5 py-1.5 rounded-md hover:bg-blue-50 transition cursor-pointer"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => navigate(`/test/${test.id}/edit`)}
//                       className="text-xs text-gray-500 hover:text-green-600 px-2.5 py-1.5 rounded-md hover:bg-green-50 transition cursor-pointer"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(test.id)}
//                       disabled={deletingId === test.id}
//                       className="text-xs text-gray-500 hover:text-red-600 px-2.5 py-1.5 rounded-md hover:bg-red-50 transition cursor-pointer disabled:opacity-40"
//                     >
//                       {deletingId === test.id ? "..." : "Delete"}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}
//   </div>
// </div>
