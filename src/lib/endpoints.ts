const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const endpoints = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login/`,
    REGISTER: `${API_BASE}/auth/register/`,
    LOGOUT: `${API_BASE}/auth/logout/`,
  },
}