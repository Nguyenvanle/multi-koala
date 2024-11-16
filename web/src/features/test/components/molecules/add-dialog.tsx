"use client";

import { useState } from "react";
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
import LessonAddForm from "@/features/lessons/components/molecules/add-form";
import { PlusCircle } from "lucide-react";
import ExamAddForm from "@/features/test/components/atoms/add-form";

export default function ExamDialogForm() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-8 gap-1" size="sm">
          <PlusCircle className="w-3.5 h-3.5" />
          Add New Exam
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Exam</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new exam to this course.
          </DialogDescription>
        </DialogHeader>

        <ExamAddForm
          onSuccess={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
