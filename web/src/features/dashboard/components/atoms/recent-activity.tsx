import React from "react";
import { ArrowUpDown, ArrowUpRight } from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const testData = [
  {
    id: 1,
    student: "Alice Johnson",
    avatar: "AJ",
    course: "React Fundamentals",
    lesson: "Components",
    testName: "Component Lifecycle",
    correct: "18/20",
    score: 90,
    date: "2024-10-22",
  },
  {
    id: 2,
    student: "Bob Smith",
    avatar: "BS",
    course: "Python Basics",
    lesson: "Data Structures",
    testName: "Lists and Tuples",
    correct: "15/20",
    score: 75,
    date: "2024-09-11",
  },
  {
    id: 3,
    student: "Charlie Brown",
    avatar: "CB",
    course: "Machine Learning",
    lesson: "Neural Networks",
    testName: "Backpropagation",
    correct: "35/40",
    score: 87.5,
    date: "2024-08-13",
  },
  {
    id: 4,
    student: "Diana Ross",
    avatar: "DR",
    course: "Web Development",
    lesson: "CSS Layouts",
    testName: "Flexbox and Grid",
    correct: "0/20",
    score: 0,
    date: "2024-07-05",
  },
  {
    id: 5,
    student: "Ethan Hunt",
    avatar: "EH",
    course: "Data Science",
    lesson: "Data Visualization",
    testName: "Matplotlib Basics",
    correct: "16/20",
    score: 80,
    date: "2024-06-18",
  },
];

export default function StudentTestResults() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Student Test Results</CardTitle>
          <CardDescription>
            Recent test scores and performance data
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          View All Results
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Lesson</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead className="text-right">Correct</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testData.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={`/images/fallback-image.jpg`}
                        alt={test.student}
                      />
                      <AvatarFallback>{test.avatar}</AvatarFallback>
                    </Avatar>
                    {test.student}
                  </div>
                </TableCell>
                <TableCell>{test.course}</TableCell>
                <TableCell>{test.lesson}</TableCell>
                <TableCell>{test.testName}</TableCell>
                <TableCell className="text-right">{test.correct}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      test.score >= 80
                        ? "default"
                        : test.score >= 50
                          ? "pending"
                          : "destructive"
                    }
                  >
                    {test.score}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {new Date(test.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
