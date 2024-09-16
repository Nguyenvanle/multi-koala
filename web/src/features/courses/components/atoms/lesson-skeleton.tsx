import { Skeleton } from "@/components/ui/skeleton";

export const LessonSkeleton = () => (
  <div className="flex flex-col gap-4 bg-background">
    {[...Array(6)].map((_, index) => (
      <Skeleton key={index} className="flex h-20 w-full" />
    ))}
  </div>
);
