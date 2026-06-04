import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface LoginForm {
  userId: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi(data.userId, data.password);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] p-2 md:p-4">
      <div className="hidden w-1/2 flex-col items-center justify-center relative md:flex">
        <img src="/src/assets/login-bg.png" alt="login illustration" />
      </div>

      <div className="w-full md:w-1/2">
        <div className="w-full h-full bg-white rounded-2xl shadow-sm p-10 md:p-24 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-1">
            <img
              src="/src/assets/logo.png"
              alt="PrepRoute Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Login
            </h1>
            <p className="text-xs text-slate-500">
              Use your company provided Login credentials
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                User ID
              </label>
              <input
                {...register("userId", { required: "User ID is required" })}
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                className="w-full px-4 py-3 rounded-lg border border-blue-400 bg-white text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors text-sm"
                required
              />
              {errors.userId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.userId.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg border border-blue-400 bg-white text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors text-sm"
                required
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <div className="text-left">
              <a
                href="#forgot-password"
                className="text-xs font-medium text-[#5988EF] hover:text-[#1B5DEF] hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5988EF] hover:bg-[#1B5DEF] text-white font-medium py-3 px-4 rounded-lg text-sm mt-4 cursor-pointer"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
          {error && (
            <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
