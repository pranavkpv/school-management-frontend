"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, TableColumn } from "@/components/shared/data-table";
import { ClassData, ClassPayload, createClass, deleteClass, getClasses, updateClass } from "@/api/classApi";
import { PageHeader } from "@/components/shared/page-header";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { ClassFormDialog } from "@/components/class/classFormDialog";



export default function ClassesPage() {
  const [rows, setRows] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);

  // Form dialog state
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ClassData | null>(null);

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ClassData | null>(null);

  // ── Fetch ──────────────────────────────────────────────────
  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClasses();
      console.log(data)
      setRows(data);
    } catch (err) {
      console.error("Failed to load classes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  // ── Handlers ───────────────────────────────────────────────
  const handleAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const handleEdit = (row: ClassData) => {
    setEditTarget(row);
    setFormOpen(true);
  };

  const handleDeleteClick = (row: ClassData) => {
    setDeleteTarget(row);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (payload: ClassPayload) => {
    if (editTarget) {
      const updated = await updateClass(editTarget._id, payload);
      setRows((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
    } else {
      const created = await createClass(payload);
      setRows((prev) => [...prev, created]);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteClass(deleteTarget._id);
    setRows((prev) => prev.filter((r) => r._id !== deleteTarget._id));
  };

  // ── Columns ────────────────────────────────────────────────
  const columns: Array<TableColumn<ClassData>> = [
    {
      key: "className",
      label: "Class Name",
      render: (row) => (
        <span className="font-medium text-white">
          {row.className}
        </span>
      )
    },
    {
      key: "feesPerMonth",
      label: "Fees",
      render: (row) => (
        <span>₹ {row.feesPerMonth}</span>
      )
    },
    {
      key: "startDate",
      label: "Start Date",
      render: (row) => (
        <span>
          {new Date(row.startDate)
            .toLocaleDateString()}
        </span>
      )
    },
    {
      key: "durationMonths",
      label: "Duration",
      render: (row) => (
        <span>
          {row.durationMonths} months
        </span>
      )
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/30 hover:bg-white/10 hover:text-white"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-white/10 bg-[#0d0d0d] text-white"
            >
              <DropdownMenuItem
                onClick={() => handleEdit(row)}
                className="flex cursor-pointer items-center gap-2 text-white/70 focus:bg-white/10 focus:text-white"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteClick(row)}
                className="flex cursor-pointer items-center gap-2 text-red-400 focus:bg-red-500/10 focus:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <PageHeader
        title="Classes"
        description="Create and manage school classes."
        action={{
          label: "Add Class",
          onClick: handleAdd,
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyText="No classes yet. Add your first class to get started."
      />

      {/* Add / Edit dialog */}
      <ClassFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        editData={editTarget}
        onSubmit={handleFormSubmit}
      />

      {/* Delete confirmation */}
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={deleteTarget?.className ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}