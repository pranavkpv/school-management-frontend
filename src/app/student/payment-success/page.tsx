"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { capturePaypalPayment } from "@/api/fees";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const orderId = searchParams.get("token");   // PayPal sends orderId as 'token'
    const feeId = searchParams.get("feeId");

    if (!orderId || !feeId) {
      setStatus("error");
      return;
    }

    capturePaypalPayment(orderId, feeId)
      .then(() => {
        setStatus("success");
        setTimeout(() => router.push("/fees"), 3000); // redirect after 3s
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {status === "loading" && <p className="text-lg">Processing your payment...</p>}
      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-600">Payment Successful! 🎉</h1>
          <p className="text-muted-foreground">Redirecting you back to fees...</p>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
          <p className="text-muted-foreground">Something went wrong. Please contact support.</p>
          <button onClick={() => router.push("/fees")} className="underline">
            Go back to fees
          </button>
        </>
      )}
    </div>
  );
}