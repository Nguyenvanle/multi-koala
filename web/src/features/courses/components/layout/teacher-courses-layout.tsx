import React, { Dispatch, SetStateAction } from "react";
import { Card } from "@/components/ui/card";
import { CourseStatusDonutChart } from "@/features/courses/components/atoms/course-status-pie-chart";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { TeacherMyCoursesBodyType } from "@/features/courses/types/teacher-my-courses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COURSE_VERIFY } from "@/types/course/verify";
import {
  TeacherCoursesHeader,
  TeacherCoursesTableHeader,
  TeacherCourseTable,
  TeacherOverviewList,
  TeacherTable,
} from "@/features/courses/components/organisms";
import {
  FilterOption,
  SortOption,
} from "@/features/courses/hooks/useMyTeacherCourses";

interface TeacherCourseTemplateProps {
  teacherStatistic: TeacherStatisticsBodyType;
  teacherMyCourses: TeacherMyCoursesBodyType;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setFilterOptions: Dispatch<SetStateAction<FilterOption[]>>;
  setSortOption: Dispatch<SetStateAction<SortOption | null>>;
  currentSort: SortOption | null;
}

const TeacherCourseLayout = ({
  teacherMyCourses,
  setSearchTerm,
  setFilterOptions,
  setSortOption,
  currentSort,
}: TeacherCourseTemplateProps) => {
  return (
    <div className="w-full flex flex-col gap-4 xl:gap-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <TeacherCoursesHeader />
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col min-[510px]:flex-row items-center md:justify-between gap-4 md:gap-6">
          <TeacherCoursesTableHeader
            setFilterOptions={setFilterOptions}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <TabsContent value="all">
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
          />
        </TabsContent>

        <TabsContent value={COURSE_VERIFY.Values.APPROVED}>
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
          />
        </TabsContent>

        <TabsContent value={COURSE_VERIFY.Values.IN_EDITING}>
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
          />
        </TabsContent>

        <TabsContent value={COURSE_VERIFY.Values.PENDING_APPROVAL}>
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
          />
        </TabsContent>

        <TabsContent value={COURSE_VERIFY.Values.REJECTED}>
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCourseLayout;
