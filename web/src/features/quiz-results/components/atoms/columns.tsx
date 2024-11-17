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
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-2 text-sm font-medium ">
        {String(row.getValue("courseName"))}
      </div>
    ),
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-2 text-sm font-medium">
        {String(row.getValue("studentName"))}
      </div>
    ),
  },
  {
    accessorKey: "lessonName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lesson" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-2 text-sm font-medium">
        {String(row.getValue("lessonName"))}
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "testName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Test" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-2 text-sm font-medium">
        {String(row.getValue("testName"))}
      </div>
    ),
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Score"
        className="text-center justify-center"
      />
    ),
    cell: ({ row }) => {
      const score = String(row.getValue("score")).replace("%", "");
      const numberValue = parseFloat(score);

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
            className="px-2 py-1 text-xs"
          >
            {numberValue.toFixed(1)}%
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "correct",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Correct"
        className="text-center justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center text-sm font-medium">
        {String(row.getValue("correct"))}
      </div>
    ),
  },
  {
    accessorKey: "dateTaken",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Time"
        className="justify-end text-right"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right text-sm font-medium">
        {dateFormatter(new Date(row.getValue("dateTaken")))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const report = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/courses/${report.courseId}`}
                  className="flex flex-row gap-2 items-center"
                >
                  <Eye className="w-4 h-4" />
                  Course
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/courses/${report.courseId}/lessons/${report.lessonId}`}
                  className="flex flex-row gap-2 items-center"
                >
                  <Eye className="w-4 h-4" />
                  Lesson
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/courses/${report.courseId}/lessons/${report.lessonId}/tests/${report.testId}/edit`}
                  className="flex flex-row gap-2 items-center"
                >
                  <Pencil className="w-4 h-4 " />
                  Test
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
