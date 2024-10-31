"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Tạo một table state bằng tanstack table
  const table = useReactTable({
    data, // table data
    columns, // columns data
    getCoreRowModel: getCoreRowModel(), // tính toán và tạo 1 table model state
    getPaginationRowModel: getPaginationRowModel(), // tính toán và tạo 1 table pagination model state
  });

  return (
    <div>
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
