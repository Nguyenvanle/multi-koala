import { PieChartLabelProps } from "@/features/dashboard/types/chart";

export const PieChartLabel: React.FC<PieChartLabelProps> = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percentage,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="middle"
      className="text-xs fill-muted-foreground"
    >
      {`${percentage}%`}
    </text>
  );
};
