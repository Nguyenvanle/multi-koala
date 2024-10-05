import React, { useMemo } from "react"
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

type CourseStatus = "APPROVED" | "PENDING_APPROVAL" | "REJECTED" | "IN_EDITING"

type CourseStatistic = {
  courseId: string
  courseName: string
  status: CourseStatus
  totalEnrollments: number
  totalCompleted: number
  income: number
}

const statusColors: Record<CourseStatus, string> = {
  APPROVED: "hsl(152, 57%, 58%)",
  PENDING_APPROVAL: "hsl(35, 100%, 50%)",
  REJECTED: "hsl(0, 84%, 60%)",
  IN_EDITING: "hsl(201, 96%, 32%)",
}

const statusLabels: Record<CourseStatus, string> = {
  APPROVED: "Approved",
  PENDING_APPROVAL: "Pending Approval",
  REJECTED: "Rejected",
  IN_EDITING: "In Editing",
}

interface CourseStatusDonutChartProps {
  teacherCourseStatistic: CourseStatistic[]
}

export function CourseStatusDonutChart({
  teacherCourseStatistic,
}: CourseStatusDonutChartProps) {
  const chartData = useMemo(() => {
    const statusCounts: Record<CourseStatus, number> = {
      APPROVED: 0,
      PENDING_APPROVAL: 0,
      REJECTED: 0,
      IN_EDITING: 0,
    }

    teacherCourseStatistic.forEach((course) => {
      statusCounts[course.status]++
    })

    return Object.entries(statusCounts)
      .filter(([_, count]) => count > 0)
      .map(([status, count]) => ({
        status: statusLabels[status as CourseStatus],
        count,
        fill: statusColors[status as CourseStatus],
      }))
  }, [teacherCourseStatistic])

  const totalCourses = teacherCourseStatistic.length
  const approvedCourses = teacherCourseStatistic.filter(
    (course) => course.status === "APPROVED"
  ).length

  if (totalCourses === 0) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Course Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <p className="text-muted-foreground mb-4">
            You haven&apos;t created any courses yet. Start creating your first course to see the status distribution.
          </p>
          <Link href="/dashboard/courses/add" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Course
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Course Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
          <PieChart width={250} height={250}>
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-background p-2 rounded shadow">
                      <p className="font-semibold">{data.status}</p>
                      <p>{`${data.count} course${
                        data.count !== 1 ? "s" : ""
                      }`}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {((approvedCourses / totalCourses) * 100).toFixed(1)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Approved
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 gap-2 w-full ">
          {chartData.map(({ status, fill }) => (
            <div key={status} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: fill }}
              />
              <span className="text-muted-foreground">{status}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}