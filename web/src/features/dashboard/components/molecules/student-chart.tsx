"use client";

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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  calculateTotalStudents,
  enrichDataWithPercentages,
} from "@/features/dashboard/utils/chart";
import { CHART_CONFIG } from "@/features/dashboard/constants/chart";
import {
  CenterLabel,
  PieChartLabel,
  PieTooltip,
} from "@/features/dashboard/components/atoms";
import { useMemo } from "react";
import { StudentChartBodyType } from "@/features/enroll-courses/types/my-student-chart";
import { ChartDataItem } from "@/features/dashboard/types/chart";

interface VisitorsPieChartProps {
  studentChartData: StudentChartBodyType;
  title?: string;
  description?: string;
  trendingPercentage?: number;
  dateRange?: string;
}

const VisitorsPieChart: React.FC<VisitorsPieChartProps> = ({
  studentChartData,
  title = "Student Status Analysis",
  description,
  trendingPercentage = 0,
  dateRange = "this month",
}) => {
  const processedData = useMemo(
    (): ChartDataItem[] => [
      {
        browser: "new",
        students: studentChartData.studentStatus[0].numberOfStudents,
        fill: "var(--color-new)",
      },
      {
        browser: "active",
        students: studentChartData.studentStatus[1].numberOfStudents,
        fill: "var(--color-active)",
      },
      {
        browser: "completed lesson",
        students: studentChartData.studentStatus[2].numberOfStudents,
        fill: "var(--color-done)",
      },
      {
        browser: "completed course",
        students: studentChartData.studentStatus[3].numberOfStudents,
        fill: "var(--color-pause)",
      },
      {
        browser: "inactive",
        students: studentChartData.studentStatus[4].numberOfStudents,
        fill: "var(--color-other)",
      },
    ],
    [studentChartData.studentStatus]
  );

  const totalStudents = useMemo(
    () => calculateTotalStudents(processedData),
    [processedData]
  );
  const chartDataWithPercentages = useMemo(
    () => enrichDataWithPercentages(processedData, totalStudents),
    [processedData, totalStudents]
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center lg:flex-row gap-6 pb-0 h-full">
        <ChartContainer
          config={CHART_CONFIG}
          className="flex flex-1 mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel className="min-w-[10rem] " />
              }
            />
            <Pie
              data={chartDataWithPercentages}
              dataKey="students"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={1}
              label={PieChartLabel}
            >
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <CenterLabel
                      title="Students"
                      totalVisitors={totalStudents}
                      viewBox={viewBox}
                    />
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex flex-0 flex-row flex-wrap lg:flex-col gap-4 mr-0 sm:mr-8 xl:mr-16 justify-center">
          {chartDataWithPercentages.map((item, index) => (
            <PieTooltip key={index} index={index} item={item} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-2">
        <div className="flex items-center gap-2 font-medium leading-none">
          {typeof trendingPercentage === "number" ? (
            <span>
              Trending up by {trendingPercentage.toFixed(2)}% this month
            </span>
          ) : (
            <span>Trending up 0.0% this month</span>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total students for {dateRange}
        </div>
      </CardFooter>
    </Card>
  );
};

export default VisitorsPieChart;
