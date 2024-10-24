import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const studentPerformanceData = [
  { name: "Week 1", score: 65 },
  { name: "Week 2", score: 70 },
  { name: "Week 3", score: 75 },
  { name: "Week 4", score: 80 },
  { name: "Week 5", score: 85 },
  { name: "Week 6", score: 90 },
];

export function StudentDashboard() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search students..."
            className="w-[300px]"
          />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Course Completion Rate
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              2 new courses this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Performance Trend</CardTitle>
            <CardDescription>
              Average weekly scores across all courses
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                score: {
                  label: "Score",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="score"
                    fill="var(--color-score)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
            <CardDescription>Based on overall course scores</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src="/images/fallback-image.jpg"
                          alt="@johndoe"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      John Doe
                    </div>
                  </TableCell>
                  <TableCell>Advanced React</TableCell>
                  <TableCell>98%</TableCell>
                  <TableCell>
                    <Badge>Completed</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src="/images/fallback-image.jpg"
                          alt="@janesmith"
                        />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      Jane Smith
                    </div>
                  </TableCell>
                  <TableCell>Data Science Fundamentals</TableCell>
                  <TableCell>95%</TableCell>
                  <TableCell>
                    <Badge>In Progress</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src="/images/fallback-image.jpg"
                          alt="@bobwilson"
                        />
                        <AvatarFallback>BW</AvatarFallback>
                      </Avatar>
                      Bob Wilson
                    </div>
                  </TableCell>
                  <TableCell>UX Design Principles</TableCell>
                  <TableCell>92%</TableCell>
                  <TableCell>
                    <Badge>Completed</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Student Activities</CardTitle>
            <CardDescription>
              Latest actions and progress updates
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            View All
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="/images/fallback-image.jpg"
                        alt="@alicejohnson"
                      />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    Alice Johnson
                  </div>
                </TableCell>
                <TableCell>Submitted Assignment</TableCell>
                <TableCell>Web Development Bootcamp</TableCell>
                <TableCell>2023-06-28</TableCell>
                <TableCell>
                  <Badge variant="outline">Pending Review</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="/images/fallback-image.jpg"
                        alt="@michaelbrown"
                      />
                      <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                    Michael Brown
                  </div>
                </TableCell>
                <TableCell>Completed Quiz</TableCell>
                <TableCell>Python for Beginners</TableCell>
                <TableCell>2023-06-27</TableCell>
                <TableCell>
                  <Badge variant="outline">Passed</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="/images/fallback-image.jpg"
                        alt="@emilydavis"
                      />
                      <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                    Emily Davis
                  </div>
                </TableCell>
                <TableCell>Started New Course</TableCell>
                <TableCell>Machine Learning Fundamentals</TableCell>
                <TableCell>2023-06-26</TableCell>
                <TableCell>
                  <Badge variant="outline">In Progress</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
