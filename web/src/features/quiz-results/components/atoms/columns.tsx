"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { MyReportBodyType } from "@/features/quiz-results/types/my-report";
import { DataTableColumnHeader } from "@/features/table/components/atoms/column-header";
import { dateFormatter } from "@/utils/date-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const quizColumns: ColumnDef<MyReportBodyType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "courseName",
    header: "Course",
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" />
    ),
  },
  {
    accessorKey: "lessonName",
    header: "Lesson",
  },
  {
    accessorKey: "testName",
    header: "Test",
  },

  {
    accessorKey: "score",
    header: () => <div className="text-center">Score</div>,
    cell: ({ row }) => {
      const score = new String(row.getValue("score"));
      const numberString = score.replace("%", "");
      const numberValue = parseFloat(numberString);

      return (
        <div className="text-center">
          <Badge
            variant={
              numberValue >= 80
                ? "default"
                : numberValue >= 50
                  ? "pending"
                  : "destructive"
            }
          >
            {numberValue.toFixed(1)} %
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "correct",
    header: () => <div className="text-right">Correct</div>,
    cell: ({ row }) => {
      const correct = new String(row.getValue("correct"));

      return <div className="text-right">{correct}</div>;
    },
  },
  {
    accessorKey: "dateTaken",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Time"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateTaken"));
      const formatted = dateFormatter(date);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const report = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(report.studentId)}
            >
              Copy student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View course details</DropdownMenuItem>
            <DropdownMenuItem>View report details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
