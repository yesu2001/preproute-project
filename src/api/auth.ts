import api from "./axios";
import type { ApiResponse, AuthResponse } from "../types";

export const loginApi = async (userId: string, password: string) => {
  const response = await api.post<ApiResponse<AuthResponse["data"]>>(
    "/auth/login",
    { userId, password },
  );
  return response.data;
};
