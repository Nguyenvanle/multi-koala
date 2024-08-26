"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function LazyImage({ src, alt, width, height }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new (Image as any)();
    img.src = src;
    img.onload = () => setIsLoading(false);
  }, [src]);

  return (
    <div style={{ width, height, position: "relative" }}>
      {isLoading && (
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
