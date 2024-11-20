import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardX } from "lucide-react";

export const EmptyState = () => (
  <CardContent className="flex flex-col  items-center justify-center py-12 ">
    <ClipboardX className="h-16 w-16 text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No Courses Available
    </h3>
    <p className="text-gray-500 text-center">
      There is currently no courses data to display. Please check back later or
      create a new courses.
    </p>
  </CardContent>
);

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center ">
    <Skeleton className="h-[60vh] w-[90vw] mb-4" />
  </div>
);
