import React from "react";
import Link from "next/link";
import { PlusCircle, Home, Search, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COURSE_VERIFY } from "@/types/course/verify";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeacherCoursesHeaderProps {}

export default function TeacherCoursesHeader() {
  return (
    <>
      <TabsList className="flex self-start bg-gray-200 dark:bg-gray-700 flex-grow w-full md:w-auto md:grow-0">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value={COURSE_VERIFY.Values.APPROVED}>
          Approved
        </TabsTrigger>
        <TabsTrigger value={COURSE_VERIFY.Values.PENDING_APPROVAL}>
          Pending Approval
        </TabsTrigger>
        <TabsTrigger value={COURSE_VERIFY.Values.IN_EDITING}>
          In Editing
        </TabsTrigger>
        <TabsTrigger value={COURSE_VERIFY.Values.REJECTED}>
          Rejected
        </TabsTrigger>
      </TabsList>

      <div className="flex flex-row items-center gap-2">
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
}
