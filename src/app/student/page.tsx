"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, TableColumn } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeeResponse, getStudentFees } from "@/api/fees";
import { initiatePaypalPayment } from "@/api/fees";

type FeeRow = {
  _id: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending";
};

export default function FeesPage() {
  const router = useRouter();
  const [rows, setRows] = useState<FeeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadFees() {
      try {
        const data: FeeResponse[] = await getStudentFees();
        console.log(data)
        const mapped = data.map((fee, index) => ({
          _id: fee._id,                         
          studentName: "You",
          amount: fee.amount,
          dueDate: fee.monthOfPayment,
          status: (fee.paymentStatus === "PAID" ? "paid" : "pending") as "paid" | "pending",
        }));
        setRows(mapped);
      } catch (error) {
        console.error("Failed to load fees", error);
      } finally {
        setLoading(false);
      }
    }
    loadFees();
  }, []);

  const handlePay = async (feeId: string) => {
    try {
      setPayingId(feeId);
      const { approvalUrl } = await initiatePaypalPayment(feeId);
      console.log(approvalUrl)
      // Redirect user to PayPal
      window.location.href = approvalUrl;
    } catch (err) {
      console.error("Payment initiation failed", err);
      alert("Could not start payment. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  const columns: Array<TableColumn<FeeRow>> = [
    { key: "studentName", label: "Student" },
    { key: "amount", label: "Amount", render: (row) => `₹${row.amount}` },
    { key: "dueDate", label: "Month" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge variant={row.status === "paid" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "_id",
      label: "Action",
      render: (row) =>
        row.status === "pending" ? (
          <Button
            onClick={() => handlePay(row._id)}
            disabled={payingId === row._id}
          >
            {payingId === row._id ? "Redirecting..." : "Pay Now"}
          </Button>
        ) : (
          "—"
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Pending Fees" description="View pending fee payments." />
      <DataTable
        columns={columns}
        rows={rows}
        emptyText={loading ? "Loading fees..." : "No pending fee records."}
      />
    </div>
  );
}