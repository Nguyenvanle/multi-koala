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
import { Input } from "@/components/ui/input";

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

      <div className="flex flex-row items-center gap-2 w-full md:max-w-96">
        <div className="relative flex-grow ">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search for course names..."
            // value={value}
            // onChange={onChange}
            className="pl-8 focus:border-accent"
          />
        </div>
      </div>
    </>
  );
}
