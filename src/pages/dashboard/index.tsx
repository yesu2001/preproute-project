import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllTests, updateTest } from "../api/tests";
// import type { Test } from "../types";
import DashboardHeader from "./DashboardHeader";
import TestTableList from "./TestTableList";
import type { Test } from "../../types";
import { getAllTests } from "../../api/tests";

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
      const res = await getAllTests();
      setTests(res.data);
      // setTests(filteredTests);
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
      {/* Dashboard Header */}
      <DashboardHeader onCreateNewTest={onCreateNewTest} />
      {/* Dashboard Test Table */}
      <TestTableList
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        loading={loading}
        filteredTests={filteredTests}
      />
    </div>
  );
}
