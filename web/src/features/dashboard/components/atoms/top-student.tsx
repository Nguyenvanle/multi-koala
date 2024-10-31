import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

export default function TopPerformingStudents() {
  return (
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
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
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
                <Badge className="line-clamp-1">In Progress</Badge>
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
  );
}
