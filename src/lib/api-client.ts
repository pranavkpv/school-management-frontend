const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as {
      message?: string | string[];
    };
    const fallback = `Request failed: ${response.status}`;
    const message = Array.isArray(payload.message)
      ? payload.message.join(", ")
      : payload.message || fallback;
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, token?: string) => request<T>(path, { method: "GET", token }),
  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "POST", body, token }),
  patch: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "PATCH", body, token }),
  delete: <T>(path: string, token?: string) => request<T>(path, { method: "DELETE", token }),
};
