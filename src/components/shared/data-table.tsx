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

type DataTableProps<T extends { id: string }> = {
  columns: Array<TableColumn<T>>;
  rows: T[];
  emptyText?: string;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyText = "No records found.",
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.key)}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${String(column.key)}`}>
                    {column.render ? column.render(row) : String(row[column.key as keyof T] ?? "-")}
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
