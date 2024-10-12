import React from "react";
import {
  Book,
  CheckCircle,
  Users,
  DollarSign,
  BarChart2,
  Clock,
} from "lucide-react";
import TeacherOverviewCard from "@/features/courses/components/molecules/overview-card";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";

interface TeacherOverviewListProps {
  teacherStatistic: TeacherStatisticsBodyType;
}

export const TeacherOverviewList: React.FC<TeacherOverviewListProps> = ({
  teacherStatistic,
}) => {
  return (
    <>
      <TeacherOverviewCard
        icon={Book}
        title="Total Courses"
        value={teacherStatistic.totalCourses}
        color="bg-emerald-500"
      />
      <TeacherOverviewCard
        icon={CheckCircle}
        title="Approved Courses"
        value={teacherStatistic.totalApprovedCourses}
        color="bg-emerald-500"
      />
      <TeacherOverviewCard
        icon={Users}
        title="Total Enrollments"
        value={teacherStatistic.totalEnrollments}
        color="bg-orange-400"
      />
      <TeacherOverviewCard
        icon={Users}
        title="Total Students"
        value={teacherStatistic.totalStudents}
        color="bg-orange-400"
      />
      <TeacherOverviewCard
        icon={CheckCircle}
        title="Completed Courses"
        value={teacherStatistic.totalCompletedCourses}
        color="bg-red-400"
      />
      <TeacherOverviewCard
        icon={DollarSign}
        title="Total Revenue"
        value={`$${teacherStatistic.totalPrices.toLocaleString()}`}
        color="bg-red-400"
      />
      <TeacherOverviewCard
        icon={BarChart2}
        title="Pass Rate per Test"
        value={`${teacherStatistic.passRatingPerTest * 100}%`}
        color="bg-blue-400"
      />
      <TeacherOverviewCard
        icon={Clock}
        title="Correct Rate per Question"
        value={`${(teacherStatistic.correctRatingPerQuestion * 100).toFixed(
          1
        )}%`}
        color="bg-blue-400"
      />
    </>
  );
};
