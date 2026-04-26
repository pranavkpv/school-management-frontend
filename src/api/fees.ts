import { apiFetch } from "@/lib/api-client";


export type FeeResponse = {
  _id:string;
  amount: number;
  paymentStatus: "PENDING" | "PAID";
  monthOfPayment: string;
};

export async function getStudentFees() {
  return apiFetch("/student/fees");
}


export async function initiatePaypalPayment(feeId: string): Promise<{ approvalUrl: string; orderId: string }> {
  const res = await apiFetch(`/student/fees/${feeId}/pay`, { method: 'POST' });
  console.log(res)
  // if (!res.ok) throw new Error('Failed to initiate payment');
  return res
}

export async function capturePaypalPayment(orderId: string, feeId: string) {
  const res = await apiFetch(`/student/fees/capture?orderId=${orderId}&feeId=${feeId}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to capture payment');
  return res.json();
}