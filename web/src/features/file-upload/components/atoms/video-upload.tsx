"use client";

import React, { useState, useCallback } from "react";
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

export default function VideoUploadForm({
  initData,
}: {
  initData?: LessonDetailResult;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initData?.video.videoUrl ?? null
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

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

  const handleUpload = () => {
    if (!file) return;

    setUploadStatus("uploading");

    // Simulating upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
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
            <div className="space-y-2">
              <Upload className="mx-auto text-gray-400" size={24} />
              <p>Drag and drop a video file here, or click to select</p>
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
