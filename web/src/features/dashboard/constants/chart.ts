import { ChartConfig, ChartDataItem } from "@/features/dashboard/types/chart";

export const CHART_DATA: ChartDataItem[] = [
  { browser: "new", students: 275, fill: "var(--color-new)" },
  { browser: "active", students: 200, fill: "var(--color-active)" },
  { browser: "pause", students: 173, fill: "var(--color-pause)" },
  { browser: "done", students: 287, fill: "var(--color-done)" },
  { browser: "other", students: 190, fill: "var(--color-other)" },
];

export function getStatusDescription(status: string): string {
  const descriptions = {
    new: "Students who have just enrolled in your course this month",
    active: "Students have activities this month",
    pause: "Students have no activities this month",
    done: "Students who completed the course this month",
    other: "Other students are not classified",
  };
  return descriptions[status as keyof typeof descriptions] || "";
}

const STUDENTS_CHART_DATA = {
  month: new Date(),
  trend: 0.52,
  data: [
    {
      status: "new",
      students: 275,
      description: "Students who have just enrolled in your course this month",
    },
    {
      status: "active",
      students: 200,
      description: "Students have activities this month",
    },
    {
      status: "pause",
      students: 173,
      description: "Students have no activities this month",
    },
    {
      status: "done",
      students: 287,
      description: "Students who completed the course this month",
    },
    {
      status: "other",
      students: 190,
      description: "Other students are not classified",
    },
  ],
};

export const CHART_CONFIG: ChartConfig = {
  students: {
    label: "Students",
  },
  new: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  active: {
    label: "Active",
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
