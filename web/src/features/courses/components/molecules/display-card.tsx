import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Đảm bảo bạn đã import Skeleton

export default function DisplayCard({
  courseName,
  courseImage,
}: {
  courseName: string;
  courseImage: string;
}) {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  return (
    <Card className="rounded overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 ">
        <div className="relative w-full h-[52vh] aspect-video overflow-hidden">
          {loading && <Skeleton className="absolute inset-0 w-full h-full" />}
          {!courseImage.includes("https://img.freepik.com") ? (
            <Skeleton className="absolute inset-0 w-full h-full" />
          ) : (
            <Image
              src={courseImage}
              alt={courseName}
              fill
              className={`object-cover object-center ${
                loading && error ? "hidden" : "block"
              }`} // Ẩn ảnh khi đang loading
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              quality={100}
              onLoad={() => setLoading(false)} // Đặt state loading thành false khi ảnh hoàn thành tải
              onError={() => setError(true)}
            />
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
