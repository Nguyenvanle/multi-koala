import { Card, CardHeader } from "@/components/ui/card";
import { CourseCardProps } from "@/types/course/course";
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

  return (
    <Card className="rounded overflow-hidden hover:shadow-md">
      <CardHeader className="p-0 ">
        <div className="relative w-full h-[62vh] overflow-hidden">
          {loading && <Skeleton className="absolute inset-0 w-full h-full" />}{" "}
          {/* Hiển thị skeleton */}
          <Image
            src={courseImage}
            alt={courseName}
            fill
            className={`object-cover object-center ${
              loading ? "hidden" : "block"
            }`} // Ẩn ảnh khi đang loading
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={100}
            onLoadingComplete={() => setLoading(false)} // Đặt state loading thành false khi ảnh hoàn thành tải
          />
        </div>
      </CardHeader>
    </Card>
  );
}