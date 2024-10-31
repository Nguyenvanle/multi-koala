export interface ChartDataItem {
  browser: string;
  students: number;
  fill: string;
  percentage?: string;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

export interface PieChartLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percentage: number;
  browser: string;
}
