import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteDialog = ({ open, onOpenChange, onConfirm }: DeleteDialogProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Question</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this question? This action cannot be
          undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-destructive hover:bg-red-600"
        >
          Delete
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
