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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  calculateTotalVisitors,
  enrichDataWithPercentages,
} from "@/features/dashboard/utils/chart";
import { CHART_CONFIG, CHART_DATA } from "@/features/dashboard/constants/chart";
import {
  CenterLabel,
  PieChartLabel,
} from "@/features/dashboard/components/atoms";

interface VisitorsPieChartProps {
  title?: string;
  description?: string;
  trendingPercentage?: number;
  dateRange?: string;
}

const VisitorsPieChart: React.FC<VisitorsPieChartProps> = ({
  title = "Pie Chart - Donut with Text",
  description = "January - June 2024",
  trendingPercentage = 5.2,
  dateRange = "the last 6 months",
}) => {
  const totalVisitors = React.useMemo(
    () => calculateTotalVisitors(CHART_DATA),
    []
  );
  const chartDataWithPercentages = React.useMemo(
    () => enrichDataWithPercentages(CHART_DATA, totalVisitors),
    [totalVisitors]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={CHART_CONFIG}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDataWithPercentages}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={1}
              label={PieChartLabel}
            >
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <CenterLabel
                      totalVisitors={totalVisitors}
                      viewBox={viewBox}
                    />
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by {trendingPercentage}% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for {dateRange}
        </div>
      </CardFooter>
    </Card>
  );
};

export default VisitorsPieChart;
