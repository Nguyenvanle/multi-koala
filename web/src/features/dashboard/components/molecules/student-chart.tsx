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
import { CHART_CONFIG, CHART_DATA } from "@/features/dashboard/constants/chart";
import {
  CenterLabel,
  PieChartLabel,
  PieTooltip,
} from "@/features/dashboard/components/atoms";
import { useMemo } from "react";

interface VisitorsPieChartProps {
  title?: string;
  description?: string;
  trendingPercentage?: number;
  dateRange?: string;
}

const VisitorsPieChart: React.FC<VisitorsPieChartProps> = ({
  title = "Student Status Analysis",
  description = "October 2024",
  trendingPercentage = 5.2,
  dateRange = "this month",
}) => {
  const totalStudents = useMemo(() => calculateTotalStudents(CHART_DATA), []);
  const chartDataWithPercentages = useMemo(
    () => enrichDataWithPercentages(CHART_DATA, totalStudents),
    [totalStudents]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-6 pb-0">
        <ChartContainer
          config={CHART_CONFIG}
          className="flex flex-1 mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
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

        <div className="flex flex-0 flex-row flex-wrap sm:flex-col gap-4 mr-0 sm:mr-8 xl:mr-16 justify-center">
          {chartDataWithPercentages.map((item, index) => (
            <PieTooltip key={index} index={index} item={item} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-2">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by {trendingPercentage}% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total students for {dateRange}
        </div>
      </CardFooter>
    </Card>
  );
};

export default VisitorsPieChart;
