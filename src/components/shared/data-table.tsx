import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type TableColumn<T> = {
  key: keyof T | "actions";
  label: string;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T extends { _id: string }> = {
  columns: Array<TableColumn<T>>;
  rows: T[];
  emptyText?: string;
  loading?: boolean;
};

export function DataTable<T extends { _id: string }>({
  columns,
  rows,
  emptyText = "No records found.",
  loading = false,
}: DataTableProps<T>) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className="text-xs font-medium uppercase tracking-wider text-white/30"
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-sm text-white/30"
              >
                Loading…
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-sm text-white/30"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row._id}
                className="border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${row._id}-${String(column.key)}`}
                    className="text-sm text-white/80"
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T] ?? "—")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}