import React from "react";
import Link from "next/link";
import { PlusCircle, Home, Search, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const breadcrumbs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  { label: "Course Management" },
];

export const TeacherCoursesHeader = () => {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Approved
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              Pending Approval
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>In Editing</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Rejected</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="h-8 gap-1" size="sm">
          <PlusCircle className="w-3.5 h-3.5" />
          <Link
            href="/dashboard/courses/add"
            className="sr-only sm:not-sr-only sm:whitespace-nowrap font-normal"
          >
            Add New Course
          </Link>
        </Button>
      </div>
    </>
  );
};
