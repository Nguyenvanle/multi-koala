"use client";

import { extractVideoId } from "@/features/lessons/libs/util";
import React from "react";

export const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoId = extractVideoId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="aspect-video w-full rounded">
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded hover:shadow-accent hover:shadow-xl transition-shadow duration-300"
      />
    </div>
  );
};
