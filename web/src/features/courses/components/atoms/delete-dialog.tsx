import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCourse } from "@/features/courses/actions/delete-course";
import { showToast } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteDialog: React.FC<{ courseId: string }> = ({ courseId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await deleteCourse(courseId);

      console.log(res);

      if (res) {
        showToast(
          "Course deleted successfully",
          "Your course has been deleted",
          "default"
        );
      }

      router.push("/dashboard/courses");
    } catch (error: any) {
      console.error("DeleteDialog -", error);
      showToast("Course not deleted", "Error deleting course", "destructive");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          className="w-full sm:w-auto h-8"
        >
          <CircleX className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            course and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete} type="submit">
              Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline" type="submit">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteDialog;
