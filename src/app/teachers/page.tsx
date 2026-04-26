import { PageHeader } from "@/components/shared/page-header";
import { DataTable, TableColumn } from "@/components/shared/data-table";

type TeacherRow = {
  id: string;
  name: string;
  subject: string;
  experience: number;
  contactInfo: string;
};

const columns: Array<TableColumn<TeacherRow>> = [
  { key: "name", label: "Name" },
  { key: "subject", label: "Subject" },
  { key: "experience", label: "Experience (yrs)" },
  { key: "contactInfo", label: "Contact" },
];

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Teachers"
        description="Add, edit, and assign subjects to teachers."
      />
      <DataTable columns={columns} rows={[]} emptyText="No teachers yet." />
    </div>
  );
}
