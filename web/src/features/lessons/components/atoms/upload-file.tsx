"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { useParams, useRouter } from "next/navigation";
import { postCSVLessons } from "@/features/lessons/actions/post-csv-lessons";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onFileChange?: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // Max file size in bytes
  onSaveSuccess?: () => void;
  onSaveError?: () => void;
}

export function InputFile({
  label,
  onFileChange,
  accept = ".csv,text/csv,application/vnd.ms-excel,application/csv", // Default to CSV files
  maxSize = 5 * 1024 * 1024, // Default 5MB
  onSaveSuccess,
  onSaveError,
  ...props
}: InputFileProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [csvFields, setCsvFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { courseId } = useParams();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    // Reset previous errors
    setError(null);

    if (file) {
      // Validate file extension
      const isCsvFile = file.name.toLowerCase().endsWith(".csv");

      if (!isCsvFile) {
        setError("Only CSV files are allowed.");
        setFileName(null);
        setCurrentFile(null);
        if (inputRef.current) {
          inputRef.current.value = ""; // Clear the input
        }
        onFileChange?.(null);
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        setError(
          `File is too large. Maximum size is ${maxSize / 1024 / 1024}MB.`
        );
        setFileName(null);
        setCurrentFile(null);
        if (inputRef.current) {
          inputRef.current.value = ""; // Clear the input
        }
        onFileChange?.(null);
        return;
      }

      // Set file name and current file
      setFileName(file.name);
      setCurrentFile(file);
      onFileChange?.(file);
    } else {
      setFileName(null);
      setCurrentFile(null);
      onFileChange?.(null);
    }
  };

  const handleSave = async () => {
    if (!currentFile) {
      setError("No file selected");
      onSaveError?.();
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", currentFile);
      const res = await postCSVLessons(courseId as string, formData);

      if (!res.success) {
        const missingFieldsMatch = res.message.match(/\[(.*?)\]/);
        if (missingFieldsMatch) {
          const missingFields = missingFieldsMatch[1].split(", ");
          setCsvFields(missingFields);
          toast({
            title: "Error",
            description: `The CSV file is missing the following required fields: ${missingFields.join(", ")}. Please update the file and try again.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: res.message,
            variant: "destructive",
          });
        }
        onSaveError?.();
        return;
      }

      Promise.all([
        await mutate("/api/courses"),
        await mutate("/api/courses-without-filter"),
      ]);

      router.refresh();

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      // Reset file input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setFileName(null);
      setCurrentFile(null);
      setCsvFields([]);

      // Call success callback
      onSaveSuccess?.();
    } catch (err: any) {
      setError(
        err instanceof Error ? err.message : "An error occurred during save"
      );
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });

      // Call error callback
      onSaveError?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="file-input">{label}</Label>
      <Input
        ref={inputRef}
        id="file-input"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        {...props}
        className={`${props.className || ""} ${error ? "border-red-500" : ""}`}
      />
      {fileName && (
        <p className="text-sm text-gray-500 mt-1">Selected file: {fileName}</p>
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}. Please check the file and try again.
        </p>
      )}
      {csvFields.length > 0 && (
        <p className="text-sm text-red-500 mt-1">
          The CSV file is missing the following required fields:{" "}
          {csvFields.join(", ")}. Please update the file and try again.
        </p>
      )}
      {currentFile && (
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="mt-2"
          type="submit"
        >
          {isLoading ? "Saving..." : "Save File"}
        </Button>
      )}
    </div>
  );
}
