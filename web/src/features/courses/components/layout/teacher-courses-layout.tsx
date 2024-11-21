import React, { Dispatch, SetStateAction } from "react";
import { TeacherMyCoursesBodyType } from "@/features/courses/types/teacher-my-courses";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { COURSE_VERIFY } from "@/types/course/verify";
import {
  TeacherCoursesHeader,
  TeacherCoursesTableHeader,
  TeacherTable,
} from "@/features/courses/components/organisms";
import {
  FilterOption,
  SortOption,
} from "@/features/courses/hooks/useMyTeacherCourses";
import {
  PaginationControlProps,
  PaginationProps,
} from "@/features/pagination/types/pagination";

interface TeacherCourseTemplateProps {
  teacherMyCourses: TeacherMyCoursesBodyType;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setFilterOptions: Dispatch<SetStateAction<FilterOption[]>>;
  setSortOption: Dispatch<SetStateAction<SortOption | null>>;
  mutateCourses: () => void;
  currentSort: SortOption | null;
  controls: PaginationControlProps;
  pagination: PaginationProps;
  coursesLoading: boolean;
}

const TeacherCourseLayout = ({
  teacherMyCourses,
  setSearchTerm,
  setFilterOptions,
  setSortOption,
  currentSort,
  controls,
  pagination,
  coursesLoading,
  mutateCourses,
}: TeacherCourseTemplateProps) => {
  return (
    <div className="w-full flex flex-col gap-2 xl:gap-4">
      <TeacherCoursesHeader />

      <Tabs defaultValue="all">
        <div className="flex flex-col min-[510px]:flex-row items-center md:justify-between gap-2 ">
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
            controls={controls}
            pagination={pagination}
            coursesLoading={coursesLoading}
            mutateCourses={mutateCourses}
          />
        </TabsContent>

        <TabsContent value={COURSE_VERIFY.Values.APPROVED}>
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
            controls={controls}
            pagination={pagination}
            coursesLoading={coursesLoading}
            mutateCourses={mutateCourses}
          />
        </TabsContent>

        <TabsContent value={COURSE_VERIFY.Values.IN_EDITING}>
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
            controls={controls}
            pagination={pagination}
            coursesLoading={coursesLoading}
            mutateCourses={mutateCourses}
          />
        </TabsContent>

        <TabsContent value={COURSE_VERIFY.Values.PENDING_APPROVAL}>
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
            controls={controls}
            pagination={pagination}
            coursesLoading={coursesLoading}
            mutateCourses={mutateCourses}
          />
        </TabsContent>
        <TabsContent value={COURSE_VERIFY.Values.REJECTED}>
          <TeacherTable
            courses={teacherMyCourses}
            setSortOption={setSortOption}
            currentSort={currentSort}
            controls={controls}
            pagination={pagination}
            coursesLoading={coursesLoading}
            mutateCourses={mutateCourses}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCourseLayout;
