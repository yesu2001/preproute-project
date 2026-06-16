import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useAuthStore } from "./store/authStore.ts";
import Login from "./pages/login/index.tsx";
import CreateTest from "./pages/createTest/index.tsx";
import Questions from "./pages/questions/index.tsx";
import Preview from "./pages/preview/index.tsx";
import Dashboard from "./pages/dashboard/index.tsx";

const RootRedirect = () => {
  const token = useAuthStore((state) => state.token);
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test/create" element={<CreateTest />} />
          <Route path="/test/:id/edit" element={<CreateTest />} />
          <Route path="/test/:id/questions" element={<Questions />} />
          <Route path="/test/:id/preview" element={<Preview />} />
        </Route>

        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
