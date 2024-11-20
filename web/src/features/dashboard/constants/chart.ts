import { ChartConfig } from "@/features/dashboard/types/chart";

export function getStatusDescription(status: string): string {
  const descriptions = {
    new: "Students who have just enrolled in a course this month",
    active: "Students actively participating in at least one test this month",
    "completed lesson": "Students who completed the lesson this month",
    "completed course":
      "Students who have completed at least one course this month",
    inactive: "Students haven't taken any test this month",
  };
  return descriptions[status as keyof typeof descriptions] || "";
}

export const CHART_CONFIG: ChartConfig = {
  students: {
    label: "Students",
  },
  new: {
    label: "new",
    color: "hsl(var(--chart-1))",
  },
  active: {
    label: "active",
    color: "hsl(var(--chart-2))",
  },
  pause: {
    label: "Pause",
    color: "hsl(var(--chart-3))",
  },
  done: {
    label: "Done",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};
