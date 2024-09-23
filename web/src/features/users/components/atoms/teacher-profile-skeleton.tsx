import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AvatarSkeleton = () => (
  <Card className="col-span-1 shadow-lg">
    <CardContent className="flex flex-col items-center justify-center border-b p-6">
      <Skeleton className="w-60 h-60 rounded-full" />
    </CardContent>
    <CardFooter className="flex flex-col items-center">
      <Skeleton className="h-8 w-3/4 mt-4" />
      <Skeleton className="h-6 w-1/2 mt-2" />
    </CardFooter>
  </Card>
);

const InfoSkeleton = () => (
  <Card className="col-span-1 md:col-span-2 shadow-lg">
    <CardHeader className="border-b pb-4 rounded-t">
      <Skeleton className="h-8 w-3/4" />
    </CardHeader>
    <CardContent className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const CoursesSkeleton = () => (
  <div className="col-span-1 md:col-span-3 p-8 pt-4">
    <Skeleton className="h-8 w-1/4 mb-4" />
    <Skeleton className="h-4 w-3/4 mb-8" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-8 w-1/2 mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const TeacherProfileSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full self-stretch">
      <div className="grid grid-cols-1 lg:grid-cols-3 space-y-6 lg:space-x-6 lg:space-y-0 p-8 bg-secondary">
        <AvatarSkeleton />
        <InfoSkeleton />
      </div>
      <CoursesSkeleton />
    </div>
  );
};

export default TeacherProfileSkeleton;
