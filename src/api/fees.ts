import { apiFetch } from "@/lib/api-client";


export type FeeResponse = {
  amount: number;
  paymentStatus: "PENDING" | "PAID";
  monthOfPayment: string;
};

export async function getStudentFees() {
  return apiFetch("/student/fees");
}