"use client";

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
import { useState } from "react";

export default function LessonDialogForm() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-8 gap-1" size="sm">
          <PlusCircle className="w-3.5 h-3.5" />
          Add New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new lesson to this course.
          </DialogDescription>
        </DialogHeader>

        <LessonAddForm
          onSuccess={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
