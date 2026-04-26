import { apiFetch } from "@/lib/api-client";

export type SubjectData = {
  _id: string;
  name: string;
};

export type SubjectPayload = {
  name: string;
};

export async function getSubjects(): Promise<SubjectData[]> {
  return apiFetch("/admin/subject");
}

export async function createSubject(
  payload: SubjectPayload
): Promise<SubjectData> {
  return apiFetch("/admin/subject", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateSubject(
  id: string,
  payload: SubjectPayload
): Promise<SubjectData> {
  return apiFetch(`/admin/subject/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteSubject(
  id: string
): Promise<void> {
  await apiFetch(`/admin/subject/${id}`, {
    method: "DELETE",
  });
}