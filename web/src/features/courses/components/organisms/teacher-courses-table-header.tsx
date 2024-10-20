import React, { Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COURSE_VERIFY } from "@/types/course/verify";

import { Input } from "@/components/ui/input";
import { FilterOption } from "@/features/courses/hooks/useMyTeacherCourses";
import { statusLabels } from "@/features/courses/utils/get-status-color";

interface TeacherCoursesHeaderProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setFilterOptions: Dispatch<SetStateAction<FilterOption[]>>;
}

export default function TeacherCoursesTableHeader({
  setSearchTerm,
  setFilterOptions,
}: TeacherCoursesHeaderProps) {
  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (value: string) => {
    setFilterOptions([{ field: "status", value }]);
  };

  return (
    <>
      <TabsList className="flex justify-between flex-1 self-start bg-background border flex-grow w-full md:w-auto md:grow-0">
        <TabsTrigger
          value="all"
          onClick={() => {
            handleTabChange("");
          }}
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value={COURSE_VERIFY.Values.APPROVED}
          onClick={() => {
            handleTabChange(COURSE_VERIFY.Values.APPROVED);
          }}
        >
          {statusLabels.APPROVED}
        </TabsTrigger>
        <TabsTrigger
          value={COURSE_VERIFY.Values.PENDING_APPROVAL}
          onClick={() => {
            handleTabChange(COURSE_VERIFY.Values.PENDING_APPROVAL);
          }}
        >
          {statusLabels.PENDING_APPROVAL}
        </TabsTrigger>
        <TabsTrigger
          value={COURSE_VERIFY.Values.IN_EDITING}
          onClick={() => {
            handleTabChange(COURSE_VERIFY.Values.IN_EDITING);
          }}
        >
          {statusLabels.IN_EDITING}
        </TabsTrigger>
        <TabsTrigger
          value={COURSE_VERIFY.Values.REJECTED}
          onClick={() => {
            handleTabChange(COURSE_VERIFY.Values.REJECTED);
          }}
        >
          {statusLabels.REJECTED}
        </TabsTrigger>
      </TabsList>

      <div className="flex flex-row items-center gap-2 w-full md:max-w-96">
        <div className="relative flex-grow ">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search for course names..."
            onChange={handleSearch}
            className="pl-8 focus:border-accent"
          />
        </div>
      </div>
    </>
  );
}
