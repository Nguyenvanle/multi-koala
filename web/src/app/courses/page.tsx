"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { H1, H2, H3, H4, P, Small } from "@/components/ui/typography";
import { CourseCard } from "@/features/courses/components/molecules/course-card";
import useCourses from "@/features/courses/hooks/useCourses";
import {
  ArrowDownAZ,
  ArrowDownUp,
  BookUser,
  DollarSign,
  Filter,
  FolderSearch,
  FolderTree,
  Mail,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Định nghĩa loại cho SortIcons
type SortKey = "A-Z" | "Price" | "Recommend";

const SortIcons: Record<SortKey, JSX.Element> = {
  "A-Z": <ArrowDownAZ className="w-4 h-4" />,
  Price: <DollarSign className="w-4 h-4" />,
  Recommend: <BookUser className="w-4 h-4" />,
};

export default function Courses() {
  const { courses } = useCourses();

  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <div className="flex flex-1 flex-col justify-start">
        <H4 className="mt-0 text-primary">Courses</H4>

        <P className="">
          Explore our diverse range of courses designed to enhance your skills
          and knowledge. Discover more about each course below!
        </P>
      </div>

      <div className="flex flex-1 flex-row justify-end gap-4">
        <div className="flex flex-0 justify-end gap-2">
          <Button variant={"outline"}>
            <Filter className="w-4 h-4" />
          </Button>

          <Select>
            <SelectTrigger className="w-40 hover:border-primary">
              <SelectValue
                placeholder={
                  <div className="flex flex-row gap-2">
                    <ArrowDownUp className="w-4 h-4" />
                    Sort
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(SortIcons) as SortKey[]).map((sortKey) => (
                <SelectItem key={sortKey} value={sortKey}>
                  <div className="flex items-center gap-2">
                    {SortIcons[sortKey]}
                    {sortKey.charAt(0) + sortKey.slice(1)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!courses || courses.length === 0 ? (
          <Skeleton className="flex w-[94vw] h-[500px]" />
        ) : (
          courses.map((course) => (
            <Link key={course.courseId} href={`/courses/${course.courseId}`}>
              <CourseCard
                courseId={course.courseId}
                courseName={course.courseName}
                courseCreateAt={course.courseUploadedAt}
                coursePrice={course.coursePrice}
                courseDescription={course.courseDescription}
                courseType={course.types}
                courseImage={course.image.imageUrl || ""}
                uploadByTeacher={
                  course.uploadedByTeacher?.firstname +
                    " " +
                    course.uploadedByTeacher?.lastname || ""
                }
                approvedByAdmin={
                  course.approvedByAdmin?.firstname +
                    " " +
                    course.approvedByAdmin?.lastname || ""
                }
                status={course.status}
                courseRating={course.courseRating}
                courseLevel={course.courseLevel}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
