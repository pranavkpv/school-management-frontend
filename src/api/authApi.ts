import { apiFetch } from "@/lib/api-client";

interface LoginPayload {
  email: string;
  password: string;
}

export async function loginUser(data: LoginPayload) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}