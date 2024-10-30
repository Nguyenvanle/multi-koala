"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

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
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ChartData {
  category: string;
  students: number;
  fill: string;
  description: string;
}

const chartData: ChartData[] = [
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
  students: { label: "Students" },
  active: { label: "Active Students", color: "hsl(var(--chart-1))" },
  completed: { label: "Completed Courses", color: "hsl(var(--chart-2))" },
  inProgress: { label: "In Progress", color: "hsl(var(--chart-3))" },
  onHold: { label: "On Hold", color: "hsl(var(--chart-4))" },
  newlyEnrolled: { label: "Newly Enrolled", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const CompactTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const totalStudents = chartData.reduce((sum, item) => sum + item.students, 0);
  const percentage = ((data.students / totalStudents) * 100).toFixed(1);

  return (
    <div className="rounded-lg border bg-background p-2 text-sm shadow-md">
      <div className="font-medium">
        {chartConfig[data.category as keyof typeof chartConfig]?.label}
      </div>
      <div className="text-muted-foreground">
        {data.students.toLocaleString()} ({percentage}%)
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        {data.description}
      </div>
    </div>
  );
};

const CustomBarLabel = ({ x, y, width, value, totalStudents }: any) => {
  const percentage = ((value / totalStudents) * 100).toFixed(1);
  return (
    <text
      x={x + width - 8}
      y={y + 20}
      textAnchor="end"
      fill="currentColor"
      className="text-xs tabular-nums"
    >
      {percentage}%
    </text>
  );
};

export default function StudentStatsBar() {
  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.students, 0);
  }, []);

  const currentDate = new Date();
  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Enrollment Overview</CardTitle>
        <CardDescription>{monthYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 40, top: 20, bottom: 20 }}
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
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              cursor={{ fill: "var(--chart-tooltip-bg)" }}
              content={<CompactTooltip />}
              wrapperStyle={{ outline: "none" }}
              position={{ y: 0 }}
            />
            <Bar dataKey="students" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill}>
                  <CustomBarLabel totalStudents={totalStudents} />
                </Cell>
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Student enrollment up by 8.5% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Total Students: {totalStudents.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}
