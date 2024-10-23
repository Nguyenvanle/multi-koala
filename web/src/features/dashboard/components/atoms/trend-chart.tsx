"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
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

const chartData = [
  { 
    status: "active", 
    students: 275, 
    fill: "var(--color-active)",
    description: "Students currently participating in courses and regularly completing assignments"
  },
  { 
    status: "completed", 
    students: 200, 
    fill: "var(--color-completed)",
    description: "Students who have successfully finished all course requirements"
  },
  { 
    status: "inProgress", 
    students: 187, 
    fill: "var(--color-inProgress)",
    description: "Students who have started but not yet completed their coursework"
  },
  { 
    status: "onHold", 
    students: 73, 
    fill: "var(--color-onHold)",
    description: "Students who have temporarily paused their studies"
  },
  { 
    status: "newlyEnrolled", 
    students: 90, 
    fill: "var(--color-newlyEnrolled)",
    description: "Students who have just joined within the last 30 days"
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
        <p className="font-semibold text-gray-900">{chartConfig[data.status as keyof typeof chartConfig].label}</p>
        <p className="text-gray-600">{data.students} students</p>
        <p className="text-sm text-gray-500 mt-2">{data.description}</p>
      </div>
    );
  }
  return null;
};

export default function StudentStatsDonut() {
  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.students, 0);
  }, []);

  const growthRate = 8.5;

  const currentDate = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Student Enrollment Overview</CardTitle>
        <CardDescription>{`${currentMonth} ${currentYear}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            <Pie
              data={chartData}
              dataKey="students"
              nameKey="status"
              innerRadius={60}
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
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Students
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
        <div className="flex items-center gap-2 font-medium leading-none">
          Student enrollment up by {growthRate}% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Breakdown of student status across all courses
        </div>
      </CardFooter>
    </Card>
  );
}