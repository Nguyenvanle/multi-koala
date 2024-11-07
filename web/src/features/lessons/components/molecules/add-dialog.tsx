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

export default function LessonDialogForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 gap-1" size="sm">
          <PlusCircle className="w-3.5 h-3.5" />
          Add New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here
          </DialogDescription>
        </DialogHeader>

        <LessonAddForm />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
