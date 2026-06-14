import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import TestTableList from "./TestTableList";
import type { Test } from "../../types";
import { getAllTests } from "../../api/tests";
import { removeTest } from "../../api/tests";
import { useTestStore } from "../../store/testStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const { setCurrentTest } = useTestStore();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    try {
      const res = await getAllTests();
      setTests(res.data);
    } catch {
      console.error("Failed to load tests.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id: string) => {
    console.log(id);
    const testresult = tests.find((t) => t.id === id) ?? null;
    setCurrentTest(testresult);
    navigate(`/test/${id}/preview`);
  };
  const handleEdit = (id: string) => {
    console.log(id);
    const testresult = tests.find((t) => t.id === id) ?? null;
    setCurrentTest(testresult);
    navigate(`/test/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    setDeletingId(id);
    try {
      await removeTest(id);
      setTests((prev) => prev.filter((t) => t.id !== id));
    } catch {
      console.error("Failed to delete test.");
    } finally {
      setDeletingId(null);
    }
  };

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

  return (
    <div className="p-2 md:p-6 max-w-7xl w-full mx-auto flex-1 space-y-6">
      <DashboardHeader onCreateNewTest={() => navigate("/test/create")} />
      <TestTableList
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        loading={loading}
        deletingId={deletingId}
        filteredTests={filteredTests}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
