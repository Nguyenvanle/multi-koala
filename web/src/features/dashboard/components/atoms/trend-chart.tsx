"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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

const chartData = [
  {
    category: "active",
    students: 275,
    fill: "hsl(var(--chart-1))",
    description:
      "Students currently participating in courses and regularly completing assignments",
  },
  {
    category: "completed",
    students: 200,
    fill: "hsl(var(--chart-2))",
    description:
      "Students who have successfully finished all course requirements",
  },
  {
    category: "inProgress",
    students: 187,
    fill: "hsl(var(--chart-3))",
    description:
      "Students who have started but not yet completed their coursework",
  },
  {
    category: "onHold",
    students: 73,
    fill: "hsl(var(--chart-4))",
    description: "Students who have temporarily paused their studies",
  },
  {
    category: "newlyEnrolled",
    students: 90,
    fill: "hsl(var(--chart-5))",
    description: "Students who have just joined within the last 30 days",
  },
];

const chartConfig = {
  students: {
    label: "Students",
  },
  active: {
    label: "Active Students",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed Courses",
    color: "hsl(var(--chart-2))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-3))",
  },
  onHold: {
    label: "On Hold",
    color: "hsl(var(--chart-4))",
  },
  newlyEnrolled: {
    label: "Newly Enrolled",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">
          {chartConfig[data.category as keyof typeof chartConfig]?.label}
        </p>
        <p className="text-gray-600">{data.students} students</p>
        <p className="text-sm text-gray-500 mt-2">{data.description}</p>
      </div>
    );
  }
  return null;
};

export default function StudentStatsBar() {
  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.students, 0);
  }, []);

  const growthRate = 8.5;

  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Enrollment Overview</CardTitle>
        <CardDescription>{`${currentMonth} ${currentYear}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            }}
            height={300}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis
              dataKey="students"
              type="number"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="students" radius={[0, 4, 4, 0]} fill="currentColor" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Student enrollment up by {growthRate}% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total Students: {totalStudents.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}