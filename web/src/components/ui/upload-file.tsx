"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onFileChange?: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // Max file size in bytes
}

export function InputFile({
  label,
  onFileChange,
  accept = ".csv,text/csv,application/vnd.ms-excel,application/csv", // Default to CSV files
  maxSize = 5 * 1024 * 1024, // Default 5MB
  ...props
}: InputFileProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        if (inputRef.current) {
          inputRef.current.value = ""; // Clear the input
        }
        onFileChange?.(null);
        return;
      }

      // Set file name
      setFileName(file.name);
      onFileChange?.(file);
    } else {
      setFileName(null);
      onFileChange?.(null);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
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
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
