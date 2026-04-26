import { PageHeader } from "@/components/shared/page-header";
import { DataTable, TableColumn } from "@/components/shared/data-table";

type AttendanceRow = {
  id: string;
  date: string;
  className: string;
  present: number;
  absent: number;
};

const columns: Array<TableColumn<AttendanceRow>> = [
  { key: "date", label: "Date" },
  { key: "className", label: "Class" },
  { key: "present", label: "Present" },
  { key: "absent", label: "Absent" },
];

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Track attendance with date-wise history."
      />
      <DataTable columns={columns} rows={[]} emptyText="No attendance records yet." />
    </div>
  );
}
