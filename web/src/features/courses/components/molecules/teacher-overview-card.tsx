import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { icons } from "lucide-react";
import { colors } from "@/features/courses/components/atoms/revenue-chart";

const OverviewItem: React.FC<{
  title: string;
  value: string | number;
  icon: keyof typeof icons;
  colorIndex: number;
}> = ({ title, value, icon, colorIndex }) => {
  const IconComponent = icons[icon];
  const color = colors[colorIndex % colors.length];

  return (
    <div className="flex items-center space-x-4">
      <div className="p-4 rounded-lg" style={{ backgroundColor: color }}>
        <IconComponent className="h-6 w-6 text-background" />
      </div>
      <div>
        <p className="text-2xl font-bold line-clamp-1">{value}</p>
        <p className="text-sm text-gray-500 line-clamp-2">{title}</p>
      </div>
    </div>
  );
};

const OverviewCard: React.FC<{
  totalCourses: number;
  totalApprovedCourses: number;
  totalEnrollments: number;
  totalStudents: number;
  totalCompletedCourses: number;
  totalPrices: number;
  passRatingPerTest: number;
  correctRatingPerQuestion: number;
}> = ({
  totalCourses,
  totalApprovedCourses,
  totalEnrollments,
  totalStudents,
  totalCompletedCourses,
  totalPrices,
  passRatingPerTest,
  correctRatingPerQuestion,
}) => {
  return (
    <Card className="col-span-full md:col-span-1 ">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OverviewItem
            title="Total Courses"
            value={totalCourses}
            icon="BookOpen"
            colorIndex={0}
          />
          <OverviewItem
            title="Approved Courses"
            value={totalApprovedCourses}
            icon="CheckCheck"
            colorIndex={0}
          />
          <OverviewItem
            title="Total Enrollments"
            value={totalEnrollments}
            icon="UserPlus"
            colorIndex={1}
          />
          <OverviewItem
            title="Total Students"
            value={totalStudents}
            icon="Users"
            colorIndex={1}
          />
          <OverviewItem
            title="Completed Courses"
            value={totalCompletedCourses}
            icon="Award"
            colorIndex={2}
          />
          <OverviewItem
            title="Total Revenue"
            value={`$${totalPrices.toFixed(0)}`}
            icon="DollarSign"
            colorIndex={2}
          />
          <OverviewItem
            title="Pass Rate per Test"
            value={`${(passRatingPerTest * 100).toFixed(0)}%`}
            icon="ChartBar"
            colorIndex={3}
          />
          <OverviewItem
            title="Correct Rate per Question"
            value={`${(correctRatingPerQuestion * 100).toFixed(0)}%`}
            icon="ChartPie"
            colorIndex={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
