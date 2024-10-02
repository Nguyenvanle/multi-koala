"use client";

import React, { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CourseImageCard({ form }: { form: any }) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          form.setValue("image", file);
        };
        reader.readAsDataURL(file);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxSize: 5242880, // 5MB
  });

  const removeImage = useCallback(() => {
    setPreview(null);
    form.setValue("image", null);
  }, [form]);

  return (
    <Card className="flex flex-col flex-0">
      <CardContent className="pt-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Course Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {preview ? (
                    <div className="relative group">
                      <AspectRatio ratio={16 / 9} className="border rounded-lg">
                        <Image
                          src={preview}
                          alt="Course preview"
                          className="rounded-md object-cover"
                          fill
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
                                className=""
                              >
                                <Trash2 className="h-5 w-5" />
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
                          : "border-border bg-background hover:bg-secondary"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center justify-center text-center p-6">
                        <Upload className="w-10 h-10 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          SVG, PNG, JPG or GIF (max. 5MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
