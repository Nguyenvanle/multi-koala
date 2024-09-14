import { Skeleton } from "@/components/ui/skeleton";

export const FieldSkeleton: React.FC = () => (
  <div className="flex flex-1 flex-col gap-2">
    <Skeleton className="h-6 w-1/2" />
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
);
