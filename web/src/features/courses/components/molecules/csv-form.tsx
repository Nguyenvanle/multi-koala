"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputFile } from "@/features/courses/components/atoms/upload-file";

export function DialogCSVCourse({
  mutateCourses,
}: {
  mutateCourses: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileUploadSuccess = async () => {
    // Close the dialog after successful upload
    await mutateCourses();
    setIsOpen(false);
  };

  const handleFileUploadError = () => {
    // Optionally, you can keep the dialog open on error
    // or close it depending on your UX preference
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8">
          Upload .Csv
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new courses with csv file</DialogTitle>
          <DialogDescription>
            Upload a .csv file to add new courses to your account.
          </DialogDescription>
        </DialogHeader>

        <InputFile
          label="Upload"
          onFileChange={(file) => {
            // Optionally handle file selection if needed
          }}
          onSaveSuccess={handleFileUploadSuccess}
          onSaveError={handleFileUploadError}
        />
      </DialogContent>
    </Dialog>
  );
}
