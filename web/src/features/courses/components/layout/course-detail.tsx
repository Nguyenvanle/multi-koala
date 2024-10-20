import { Skeleton } from "@/components/ui/skeleton";
import DisplayCard from "@/features/courses/components/molecules/display-card";
import DetailCard from "@/features/courses/components/organisms/detail-card";
import { LessonsCardPage } from "@/features/courses/components/pages/lessons";
import { DiscountAdapter } from "@/features/courses/services/discount-adapter";
import { RatingAdapter } from "@/features/courses/services/rating-adapter";
import {
  CourseDetailResType,
  CourseDetailResultResType,
  CourseResType,
} from "@/features/courses/types/course";

interface CourseDetailLayoutProps {
  course: CourseDetailResultResType | null | undefined;
  lessons: any[] | null;
  duration: number | null;
  isLoading: boolean;
}

const CourseDetailLayout: React.FC<CourseDetailLayoutProps> = ({
  course,
  lessons,
  duration,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-secondary pr-0 flex flex-grow">
        <div className="w-full p-4 xl:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <Skeleton className="w-full aspect-video rounded-lg h-64 bg-background" />
            <Skeleton className="w-full h-full rounded-lg bg-background" />
          </div>
          <Skeleton className="w-full h-[800px] rounded-lg bg-background" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center w-full h-[82vh]">
        No course found.
      </div>
    );
  }

  // Sử dụng Optional Chaining (?.) và Nullish Coalescing (??) để xử lý dữ liệu thiếu
  const approvedByAdmin = `${course?.approvedByAdmin?.firstname ?? "N/A"} ${
    course?.approvedByAdmin?.lastname ?? ""
  }`;
  const uploadedByTeacher = `${course?.uploadedByTeacher?.firstname ?? "N/A"} ${
    course?.uploadedByTeacher?.lastname ?? ""
  }`;

  return (
    <div className="bg-secondary pr-0 flex flex-grow">
      <div className="w-full p-4 xl:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6 ">
        <div className="flex flex-col gap-4 xl:gap-6">
          <DisplayCard
            courseImage={course?.image?.imageUrl ?? "/images/smile.png"}
            courseName={course?.courseName ?? "No course name available"}
          />
          <LessonsCardPage lessons={lessons ?? []} />
        </div>

        <DetailCard
          courseName={course?.courseName ?? "N/A"}
          coursePrice={course?.coursePrice ?? 0}
          courseDescription={
            course?.courseDescription ?? "No description available"
          }
          uploadByTeacher={uploadedByTeacher}
          totalDuration={duration ?? 0}
          totalLessons={lessons?.length ?? 0}
          courseRating={RatingAdapter.getRating(course?.courseId ?? "") ?? 0}
          courseDiscount={DiscountAdapter.getDiscountedPrice(course)}
          courseId={course?.courseId ?? "N/A"}
          courseCreateAt={course?.courseUploadedAt ?? new Date()}
          courseResponsibilityEndAt={
            course.courseResponsibilityEndAt ?? course.courseUploadedAt
          }
          courseType={course?.types ?? []}
          courseFields={course?.fields ?? []}
          courseImage={course?.image?.imageUrl ?? "/images/smile.png"}
          approvedByAdmin={approvedByAdmin}
          status={course?.status ?? "N/A"}
          courseLevel={course?.courseLevel ?? "Beginner"}
          teacherId={course?.uploadedByTeacher?.userId ?? ""}
        />
      </div>
    </div>
  );
};

export default CourseDetailLayout;
