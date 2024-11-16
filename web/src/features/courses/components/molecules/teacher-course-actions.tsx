import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const TeacherCourseActions: React.FC<{ courseId: string }> = ({
  courseId,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button aria-haspopup="true" size="icon" variant="ghost">
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>
        <Link href={`/courses/${courseId}`} className="flex w-full">
          <Eye className="mr-2 h-4 w-4" />
          <span>View Details</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={`/dashboard/courses/${courseId}`} className="flex w-full">
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
