import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import TestTableList from "./TestTableList";
import type { Test } from "../../types";
import { getAllTests } from "../../api/tests";
import { removeTest } from "../../api/tests";
import { useTestStore } from "../../store/testStore";
import { getSubjects } from "../../api/subjects";
import type { Subject } from "../../types";

export default function Dashboard() {
  const navigate = useNavigate();
  const { setCurrentTest } = useTestStore();
  const [tests, setTests] = useState<Test[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchTests();
    fetchSubjects();
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

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data || []);
    } catch (err) {
      console.error("Failed to load subjects", err);
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
    const subjectLabel =
      subjects.find((s) => s.id === test.subject)?.name || test.subject || "";
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subjectLabel.toLowerCase().includes(searchTerm.toLowerCase());
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
        subjects={subjects}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
