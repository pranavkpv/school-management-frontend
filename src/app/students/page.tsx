import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, TableColumn } from "@/components/shared/data-table";
import { EntityFormDialog } from "@/components/shared/entity-form-dialog";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { PageHeader } from "@/components/shared/page-header";

type StudentRow = {
  id: string;
  name: string;
  class: string;
  rollNumber: number;
  age: number;
  contactInfo: string;
};

const studentColumns: Array<TableColumn<StudentRow>> = [
  { key: "name", label: "Name" },
  { key: "class", label: "Class" },
  { key: "rollNumber", label: "Roll Number" },
  { key: "age", label: "Age" },
  { key: "contactInfo", label: "Contact" },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <ConfirmDeleteDialog />
      </div>
    ),
  },
];

const mockStudents: StudentRow[] = [];

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Manage student records with full CRUD support."
        action={
          <EntityFormDialog
            triggerLabel="Add Student"
            title="Create Student"
            description="This reusable dialog can be connected to your create student API."
          >
            <Input placeholder="Student Name" />
            <Input placeholder="Class" />
            <Input placeholder="Roll Number" />
            <Input placeholder="Age" />
            <Input placeholder="Contact Info" />
            <Input placeholder="Email" />
          </EntityFormDialog>
        }
      />

      <div className="flex max-w-sm gap-2">
        <Input placeholder="Search by name..." />
        <Button variant="outline">Search</Button>
      </div>

      <DataTable columns={studentColumns} rows={mockStudents} emptyText="No students yet. Add your first student." />
    </div>
  );
}
