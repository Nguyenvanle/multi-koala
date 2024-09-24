import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CoursesListLoadingProps {
  className?: string;
}

export const CoursesListLoading: React.FC<CoursesListLoadingProps> = ({
  className,
}) => (
  <div className={`container ${className}`}>
    <Card className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {[...Array(8)].map((_, index) => (
        <Skeleton key={index} className="flex min-w-[180px] min-h-[460px]" />
      ))}
    </Card>
  </div>
);
