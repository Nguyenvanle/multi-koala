import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const TeacherCourseActions: React.FC<{ courseId: string }> = ({ courseId }) => (
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
        <Link href={`/courses/${courseId}`} className="w-full">
          View
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={`/dashboard/courses/${courseId}`} className="w-full">
          Edit
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
