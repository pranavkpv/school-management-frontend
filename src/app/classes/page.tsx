import { PageHeader } from "@/components/shared/page-header";
import { DataTable, TableColumn } from "@/components/shared/data-table";

type ClassRow = {
  id: string;
  name: string;
  teacher: string;
  studentCount: number;
};

const columns: Array<TableColumn<ClassRow>> = [
  { key: "name", label: "Class" },
  { key: "teacher", label: "Teacher" },
  { key: "studentCount", label: "Students" },
];

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes"
        description="Create classes and map teachers and students."
      />
      <DataTable columns={columns} rows={[]} emptyText="No classes yet." />
    </div>
  );
}
