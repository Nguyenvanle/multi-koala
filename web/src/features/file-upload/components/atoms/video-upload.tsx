"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import { postVideoLesson } from "@/features/lessons/actions/post-video-lesson";
import { showToast } from "@/lib/utils";

export default function VideoUploadForm({
  initData,
}: {
  initData?: LessonDetailResult;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initData?.video?.videoUrl ?? null
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (initData?.video?.videoUrl !== preview) {
      setPreview(initData?.video?.videoUrl ?? null);
    }
  }, [initData, preview]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const videoFile = acceptedFiles[0];
    setFile(videoFile);
    setPreview(URL.createObjectURL(videoFile));
    setUploadStatus("idle");
    setUploadProgress(0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
  });

  const handleUpload = async () => {
    try {
      if (!file) return;

      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);
      if (initData?.lessonId) {
        const { lesson } = await postVideoLesson(initData.lessonId, formData);
        if (lesson) {
          console.log(lesson);
          setUploadStatus("success");
          showToast(
            "Upload video successfully",
            "Your video has been uploaded successfully",
            "default"
          );
        }
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("error");
      showToast("Upload failed. Please try again.", "error");
    }
  };

  const handleDelete = () => {
    setFile(null);
    setPreview(null);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upload Video</CardTitle>
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          {file && (
            <Button
              onClick={handleDelete}
              variant="outline"
              className="w-full sm:w-auto h-8"
            >
              Clear
            </Button>
          )}
          <Button
            onClick={handleUpload}
            disabled={
              !file ||
              uploadStatus === "uploading" ||
              uploadStatus === "success"
            }
            className="w-full sm:w-auto h-8"
          >
            {uploadStatus === "uploading" ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
            isDragActive ? "border-primary" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="space-y-2">
              <CheckCircle2 className="mx-auto text-green-500" size={24} />
              <p>{file.name}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6">
              <Upload className="w-10 h-10 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-muted-foreground">
                MP4, MOV, AVI, and other video formats supported
              </p>
            </div>
          )}
        </div>

        {preview && (
          <div className="mt-4">
            <video src={preview} controls className="w-full rounded-lg" />
          </div>
        )}

        {uploadStatus === "uploading" && (
          <div className="mt-4 space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-center">{uploadProgress}% uploaded</p>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="mt-4 flex items-center justify-center text-green-500">
            <CheckCircle2 size={18} className="mr-2" />
            <span>Upload successful!</span>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-4 flex items-center justify-center text-red-500">
            <AlertCircle size={18} className="mr-2" />
            <span>Upload failed. Please try again.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
