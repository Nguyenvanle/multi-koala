import { Skeleton } from "@/components/ui/skeleton";

const OverviewCardSkeleton = () => (
  <div className="flex-1 bg-background">
    <div className="flex items-start p-4 space-x-4">
      <Skeleton className="h-12 w-12 rounded-lg " />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3 " />
        <Skeleton className="h-6 w-2/3" />
      </div>
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className=" bg-background h-full">
    <div className="rounded-md w-full h-10">
      <div className="flex flex-col w-full h-[400px] gap-10 p-4">
        <Skeleton className="h-6 w-full " />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  </div>
);

export const TeacherCourseSkeletonTemplate = () => {
  return (
    <div className="w-full flex flex-col gap-4 xl:gap-6 ">
      <div className="flex flex-row items-center justify-between">
        <Skeleton className="h-8 w-1/3 bg-background" />
        <Skeleton className="h-10 w-1/4 bg-background" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6">
        <Skeleton className="w-full h-[400px] bg-background" />
        <TableSkeleton />
      </div>
    </div>
  );
};
