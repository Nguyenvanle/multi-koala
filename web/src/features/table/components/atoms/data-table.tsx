"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Tạo một table state bằng tanstack table
  const table = useReactTable({
    data, // table data
    columns, // columns data
    getCoreRowModel: getCoreRowModel(), // tính toán và tạo 1 table model state
    getPaginationRowModel: getPaginationRowModel(), // tính toán và tạo 1 table pagination model state
    // Sorting
    onSortingChange: setSorting, // nhận hành dộng người dùng ấn sort
    getSortedRowModel: getSortedRowModel(), // tính toán và tạo 1 table sorted model state
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting, // đưa sorting state vào tanstack table state
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(
              (
                headerGroup // Lấy mảng header cần hiển thị
              ) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // Lấy từng header cần hiển thị
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder // xác định xem có phải cột giữ chỗ hay ko
                          ? null // Không hiển thị
                          : flexRender(
                              // Hiển thị với các thuộc tính:
                              header.column.columnDef.header, // Lấy id header
                              header.getContext() // Lấy state header
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              )
            )}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? ( // lấy mảng rows cần hiển thị
              table.getRowModel().rows.map(
                (
                  row // lấy từng row cần hiển thị
                ) => (
                  <TableRow
                    key={row.id} // lấy row id
                    data-state={row.getIsSelected() && "selected"} // kiểm tra xem row có được chọn hay ko
                  >
                    {row.getVisibleCells().map(
                      // chỉ lấy những hàng cần hiển thị (bỏ những ô không chưa thông tin hoặc bị ẩn do bộ lọc)
                      (cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            // hiển thị tương tự với header
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                )
              )
            ) : (
              // Fallback data
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
