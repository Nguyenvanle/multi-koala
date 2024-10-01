import React, { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type TeacherStatistics = {
  totalCourses: number;
  totalApprovedCourses: number;
  totalEnrollments: number;
  totalStudents: number;
  totalCompletedCourses: number;
  totalPrices: number;
  passRatingPerTest: number;
  correctRatingPerQuestion: number;
};

const chartConfig: ChartConfig = {
  courses: {
    label: "Courses",
  },
  approved: {
    label: "Approved",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-3))",
  },
};

interface CourseStatusDonutChartProps {
  teacherStatistic: TeacherStatistics;
}

export function CourseStatusDonutChart({
  teacherStatistic,
}: CourseStatusDonutChartProps) {
  const chartData = useMemo(() => {
    const completed = teacherStatistic.totalCompletedCourses;
    const approved = teacherStatistic.totalApprovedCourses;
    const inProgress = approved - completed;

    return [
      {
        status: "completed",
        courses: completed,
        fill: chartConfig.completed.color,
      },
      {
        status: "inProgress",
        courses: inProgress,
        fill: chartConfig.inProgress.color,
      },
      {
        status: "approved",
        courses: approved,
        fill: chartConfig.approved.color,
      },
    ];
  }, [teacherStatistic]);

  const totalCourses = teacherStatistic.totalCourses;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Course Status Distribution</CardTitle>
        <CardDescription>Current Academic Period</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="courses"
              nameKey="status"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCourses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Courses
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total courses and their statuses for the current academic
          period
        </div>
      </CardFooter>
    </Card>
  );
}
