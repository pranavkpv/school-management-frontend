import { PageHeader } from "@/components/shared/page-header";
import { DataTable, TableColumn } from "@/components/shared/data-table";

type SubjectRow = {
  id: string;
  name: string;
  className: string;
  teacher: string;
};

const columns: Array<TableColumn<SubjectRow>> = [
  { key: "name", label: "Subject" },
  { key: "className", label: "Class" },
  { key: "teacher", label: "Teacher" },
];

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects"
        description="Manage subjects and map them to classes and teachers."
      />
      <DataTable columns={columns} rows={[]} emptyText="No subjects yet." />
    </div>
  );
}
