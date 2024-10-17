import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { SortOption } from "@/features/courses/hooks/useMyTeacherCourses";
import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface TeacherTableHeaderProps {
  setSortOption: Dispatch<SetStateAction<SortOption | null>>;
  sortOption: SortOption | null;
}

export const TeacherTableHeader: React.FC<TeacherTableHeaderProps> = ({
  setSortOption,
  sortOption,
}) => {
  const handleSort = (field: SortOption["field"]) => {
    setSortOption((prevSort) => {
      if (prevSort && prevSort.field === field) {
        return {
          field,
          direction: prevSort.direction === "asc" ? "desc" : "asc",
        };
      }
      return { field, direction: "asc" };
    });
  };

  const SortableHeader: React.FC<{
    field: SortOption["field"];
    children: React.ReactNode;
    className?: string;
  }> = ({ field, children, className }) => (
    <TableHead className={className}>
      <Button
        variant="ghost"
        onClick={() => handleSort(field)}
        className="hover:bg-transparent p-0"
      >
        {children}
        {sortOption?.field === field ? (
          sortOption.direction === "asc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : (
            <ChevronUp className="ml-2 h-4 w-4" />
          )
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    </TableHead>
  );

  return (
    <TableHeader>
      <TableRow className="text-foreground">
        <TableHead className="table-cell">ID</TableHead>
        <TableHead className="hidden w-[100px] lg:table-cell">Image</TableHead>
        <SortableHeader field="courseName">Name</SortableHeader>
        <SortableHeader field="status">Status</SortableHeader>
        <SortableHeader field="coursePrice" className="hidden md:table-cell">
          Price
        </SortableHeader>
        <SortableHeader field="income" className="hidden md:table-cell">
          Income
        </SortableHeader>
        <SortableHeader
          field="totalEnrollments"
          className="hidden md:table-cell"
        >
          Total Sales
        </SortableHeader>
        <SortableHeader
          field="courseUploadedAt"
          className="hidden lg:table-cell"
        >
          Created at
        </SortableHeader>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
