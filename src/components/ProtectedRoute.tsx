import React, { useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Bell, ChevronDown, Menu, X } from "lucide-react";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log(token);
  // 1. Guard check: If not authenticated, redirect to login page immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Sidebar items mapping to matching endpoints declared in main.ts
  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: (
        <img
          src="/src/assets/dash.png"
          alt="Dashboard Icon"
          className="h-4 w-auto"
        />
      ),
    },
    {
      path: "/test/create",
      label: "Test Creation",
      icon: (
        <img
          src="/src/assets/edit.png"
          alt="Test Creation Icon"
          className="h-4 w-auto"
        />
      ),
    },
    {
      path: "/test-tracking",
      label: "Test Tracking",
      icon: (
        <img
          src="/src/assets/track.png"
          alt="Test Tracking Icon"
          className="h-5 w-auto"
        />
      ),
    },
  ];

  // Helper function to keep "Test Creation" highlighted even when inside deep subpaths like questions or preview
  const isPathActive = (itemPath: string) => {
    if (itemPath === "/dashboard") return location.pathname === "/dashboard";
    if (itemPath === "/test/create")
      return location.pathname.startsWith("/test");
    return location.pathname === itemPath;
  };

  return (
    <div className="flex min-h-screen text-slate-800 antialiased font-sans">
      {/* --- DESKTOP SIDEBAR (Hidden on mobile screens, matches layout theme) --- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6">
          <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-auto" />
          <nav className="mt-10 space-y-1">
            {navItems.map((item) => {
              const isActive = isPathActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-slate-50 text-[#2563EB] border-l-4 border-[#2563EB]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* --- MOBILE SIDEBAR DRAWER OVERLAY (Triggers on click) --- */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <aside
            className="w-64 bg-white h-full p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <img
                src="/src/assets/logo.png"
                alt="Logo"
                className="h-8 w-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-500 hover:text-slate-800"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="mt-10 space-y-1">
              {navItems.map((item) => {
                // const Icon = item.icon;
                const isActive = isPathActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? "bg-slate-50 text-[#2563EB]"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    {item.icon}
                    {/* <Icon size={18} /> */}
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* --- MAIN INTERACTIVE VIEW AREA CONTROLLER --- */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* TOP INTERACTIVE NAVBAR (Shared avatar and indicators area) */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-8 z-10 sticky top-0">
          {/* Hamburger Menu icon toggle for touch devices */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 md:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            {/* Structural spacing filler */}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative rounded-full hover:bg-slate-50">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
              <img
                src="/src/assets/avatar.png"
                alt="Profile Avatar"
                className="w-10 h-10 rounded-full object-cover bg-amber-100"
              />
              <div className="text-left hidden sm:block">
                <div className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                  {user?.name}{" "}
                  <ChevronDown size={14} className="text-slate-400" />
                </div>
                <div className="text-xs text-slate-400 font-medium -mt-0.5">
                  {user?.role}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
