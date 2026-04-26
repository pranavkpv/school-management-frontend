"use client";

import {
  useEffect,
  useState,
  useCallback
} from "react";

import {
  Plus,
  Pencil,
  Trash2
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  PageHeader
} from "@/components/shared/page-header";

import {
  DataTable,
  TableColumn
} from "@/components/shared/data-table";

import {
  DeleteDialog
} from "@/components/shared/DeleteDialog";

import {
  TeacherFormDialog
} from "@/components/teacher/teacher-form-dialog";

import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  TeacherData,
  TeacherPayload
} from "@/api/teacherApi";

import {
  getSubjects
} from "@/api/subjectApi";

export default function TeachersPage() {

  const [rows, setRows] =
    useState<TeacherData[]>([]);

  const [subjects, setSubjects] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [formOpen, setFormOpen] =
    useState(false);

  const [editTarget, setEditTarget] =
    useState<TeacherData | null>(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleteTarget, setDeleteTarget] =
    useState<TeacherData | null>(null);

  const fetchTeachers =
    useCallback(async () => {

      setLoading(true);

      try {

        const teacherData =
          await getTeachers();

        const subjectData =
          await getSubjects();

        setRows(teacherData);
        setSubjects(subjectData);

      }
      finally {
        setLoading(false);
      }

    }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const handleEdit = (
    row: TeacherData
  ) => {
    setEditTarget(row);
    setFormOpen(true);
  };

  const handleDeleteClick = (
    row: TeacherData
  ) => {
    setDeleteTarget(row);
    setDeleteOpen(true);
  };

  const handleSubmit =
    async (
      payload: TeacherPayload
    ) => {

      if (editTarget) {

        const updated =
          await updateTeacher(
            editTarget._id,
            payload
          );

        setRows(prev =>
          prev.map(r =>
            r._id === updated._id
              ? updated
              : r
          )
        );

      }
      else {

        const created =
          await createTeacher(
            payload
          );

        setRows(prev => [
          ...prev,
          created
        ]);

      }

    };

  const handleConfirmDelete =
    async () => {

      if (!deleteTarget) return;

      await deleteTeacher(
        deleteTarget._id
      );

      setRows(prev =>
        prev.filter(
          r =>
            r._id !== deleteTarget._id
        )
      );

    };

  const columns:
    Array<TableColumn<TeacherData>> = [

      {
        key: "name",
        label: "Name"
      },

      {
        key: "subjectId",
        label: "Subject",
        render: (row) => (
          <span>
            {row.subjectId?.name}
          </span>
        )
      },

      {
        key: "experience",
        label: "Experience (yrs)"
      },

      {
        key: "contactInfo",
        label: "Contact"
      },

      {
        key: "actions",
        label: "",
        render: (row) => (
          <div className="flex gap-2">

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleEdit(row)
              }
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                handleDeleteClick(row)
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>

          </div>
        )
      }

    ];

  return (
    <div className="space-y-6 p-6">

      <PageHeader
        title="Teachers"
        description="Add, edit, and assign subjects to teachers."
        action={{
          label: "Add Teacher",
          onClick: handleAdd,
          icon: <Plus className="h-4 w-4" />
        }}
      />

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyText="No teachers yet."
      />

      <TeacherFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        editData={editTarget}
        subjects={subjects}
        onSubmit={handleSubmit}
      />

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={
          deleteTarget?.name || ""
        }
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}