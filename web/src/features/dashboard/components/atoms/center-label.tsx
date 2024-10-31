import { PolarViewBox, ViewBox } from "recharts/types/util/types";

interface CenterLabelProps {
  title: string;
  totalVisitors: number;
  viewBox?: PolarViewBox;
}

export const CenterLabel: React.FC<CenterLabelProps> = ({
  title,
  totalVisitors,
  viewBox,
}) => {
  const centerX = viewBox?.cx ?? 0;
  const centerY = viewBox?.cy ?? 0;

  return (
    <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle">
      <tspan
        x={centerX}
        y={centerY}
        className="fill-foreground text-3xl font-bold"
      >
        {totalVisitors.toLocaleString()}
      </tspan>
      <tspan x={centerX} y={centerY + 24} className="fill-muted-foreground">
        {title}
      </tspan>
    </text>
  );
};
