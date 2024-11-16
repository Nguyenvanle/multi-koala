import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteLesson } from "@/features/lessons/actions/delete-lesson";
import { showToast } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteLessonDialog: React.FC<{ lessonId: string; courseId: string }> = ({
  lessonId,
  courseId,
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteLesson(lessonId);
      if (res) {
        setOpen(false);
        showToast(
          "Lesson deleted successfully",
          "Your lesson has been deleted",
          "default"
        );
        router.back();
      }
    } catch (error: any) {
      console.error("DeleteDialog -", error);
      showToast("Lesson not deleted", "Error deleting lesson", "destructive");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLessonDialog;