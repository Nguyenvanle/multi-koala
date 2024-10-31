import { ChartDataItem } from "@/features/dashboard/types/chart";

export const calculatePercentage = (value: number, total: number): string => {
  return ((value / total) * 100).toFixed(1);
};

export const calculateTotalVisitors = (data: ChartDataItem[]): number => {
  return data.reduce((acc, curr) => acc + curr.visitors, 0);
};

export const enrichDataWithPercentages = (
  data: ChartDataItem[],
  total: number
): ChartDataItem[] => {
  return data.map((item) => ({
    ...item,
    percentage: calculatePercentage(item.visitors, total),
  }));
};
