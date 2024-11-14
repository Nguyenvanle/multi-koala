import React, { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDropzone, FileRejection } from "react-dropzone";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionBodyType } from "@/features/test/types/question";

export default function QuestionImageUpload({
  question,
  onImageChange,
}: {
  question: QuestionBodyType;
  onImageChange: (imageData: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(
    question.image?.imageUrl || null
  );

  useEffect(() => {
    if (question.image?.imageUrl) {
      setPreview(question.image.imageUrl);
    }
  }, [question.image]);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const errorMessages = fileRejections
          .map(({ file, errors }) => {
            if (errors[0]?.code === "file-too-large") {
              return `${file.name} is too large. Max size is 5MB.`;
            }
            return `${file.name} is not a valid image.`;
          })
          .join(" ");
        console.error(errorMessages);
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        try {
          const imageUrl = URL.createObjectURL(file);

          setPreview(imageUrl);
          onImageChange(file);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  const removeImage = useCallback(() => {
    setPreview(null);
    onImageChange(null);
  }, [onImageChange]);

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative group">
          <AspectRatio ratio={16 / 9} className="border rounded-lg">
            <Image
              src={preview}
              alt="Question preview"
              className="rounded-md object-cover"
              sizes="100vw"
              fill
              priority
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-end p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={removeImage}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out min-h-[200px] ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-border bg-background hover:bg-gray-50 dark:hover:bg-slate-800"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center p-6">
            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or GIF (max. 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
