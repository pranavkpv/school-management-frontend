import { apiFetch } from "@/lib/api-client";

export type AssignmentData = {
  _id: string;

  classId: {
    _id: string;
    className: string;
  };

  teacherId: {
    _id: string;
    name: string;
  };

  subjectId: {
    _id: string;
    name: string;
  };
};

export type AssignmentPayload = {
  classId: string;
  teacherId: string;
  subjectId: string;
};

export async function getAssignments(): Promise<AssignmentData[]> {
  return apiFetch("/admin/assign");
}

export async function createAssignment(
  payload: AssignmentPayload
): Promise<AssignmentData> {
  return apiFetch("/admin/assign", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAssignment(
  id: string,
  payload: AssignmentPayload
): Promise<AssignmentData> {
  return apiFetch(`/admin/assign/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteAssignment(
  id: string
): Promise<void> {
  await apiFetch(`/admin/assign/${id}`, {
    method: "DELETE",
  });
}