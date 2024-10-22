"use client";

import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const studentPerformanceData = [
  { name: "Week 1", score: 65 },
  { name: "Week 2", score: 70 },
  { name: "Week 3", score: 75 },
  { name: "Week 4", score: 80 },
  { name: "Week 5", score: 85 },
  { name: "Week 6", score: 90 },
];

export default function StudentPerformanceTrend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance Trend</CardTitle>
        <CardDescription>
          Average weekly scores across all courses
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer
          config={{
            score: {
              label: "Score",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentPerformanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="score"
                fill="var(--color-score)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
