import { apiFetch } from "@/lib/api-client";

export type ClassData = {
  _id: string;
  className: string;
  feesPerMonth: number;
  startDate: string;
  durationMonths: number;
};

export type ClassPayload = {
  className: string;
  feesPerMonth: number;
  startDate: string;
  durationMonths: number;
};

export async function getClasses(): Promise<ClassData[]> {
  return apiFetch("/admin/class");
}

export async function createClass(
  payload: ClassPayload
): Promise<ClassData> {
  return apiFetch("/admin/class", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateClass(
  id: string,
  payload: ClassPayload
): Promise<ClassData> {
  return apiFetch(`/admin/class/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteClass(
  id: string
): Promise<void> {
  await apiFetch(`/admin/class/${id}`, {
    method: "DELETE",
  });
}