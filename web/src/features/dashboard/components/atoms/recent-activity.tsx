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
import { testData } from "@/features/dashboard/constants/student-test";

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
              <TableHead>Course</TableHead>
              <TableHead className="w-[180px]">Student</TableHead>
              <TableHead>Lesson</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-right">Correct</TableHead>
              <TableHead className="hidden xl:table-cell text-right">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testData.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.course}</TableCell>
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
                <TableCell>{test.lesson}</TableCell>
                <TableCell>{test.testName}</TableCell>
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
                <TableCell className="text-right">{test.correct}</TableCell>
                <TableCell className="hidden xl:table-cell text-right">
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
