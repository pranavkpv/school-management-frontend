import { PageHeader } from "@/components/shared/page-header";
import { DataTable, TableColumn } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";

type FeeRow = {
  id: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending";
};

const columns: Array<TableColumn<FeeRow>> = [
  { key: "studentName", label: "Student" },
  { key: "amount", label: "Amount" },
  { key: "dueDate", label: "Due Date" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <Badge variant={row.status === "paid" ? "default" : "secondary"}>{row.status}</Badge>
    ),
  },
];

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Fees"
        description="Fee calculation and online payment integration entry point."
      />
      <DataTable columns={columns} rows={[]} emptyText="No fee records yet." />
    </div>
  );
}
