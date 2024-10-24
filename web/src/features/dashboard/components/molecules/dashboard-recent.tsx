import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

export default function DashboardRecentlySoldCourses() {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recently Sold Courses</CardTitle>
          <CardDescription>
            Your recent course has been purchased.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="hidden md:table-cell">Course</TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
              <TableHead className="hidden xl:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Emma Brown</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  emma@example.com
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                Advanced React Patterns
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge className="text-xs" variant="outline">
                  Completed
                </Badge>
              </TableCell>
              <TableCell className="hidden xl:table-cell">2023-06-23</TableCell>
              <TableCell className="text-right">$129.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                Python for Data Science
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge className="text-xs" variant="outline">
                  In Progress
                </Badge>
              </TableCell>
              <TableCell className="hidden xl:table-cell">2023-06-24</TableCell>
              <TableCell className="text-right">$89.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Olivia Smith</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  olivia@example.com
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                UX/UI Design Fundamentals
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge className="text-xs" variant="outline">
                  Completed
                </Badge>
              </TableCell>
              <TableCell className="hidden xl:table-cell">2023-06-25</TableCell>
              <TableCell className="text-right">$149.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Noah Williams</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  noah@example.com
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                Machine Learning Basics
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge className="text-xs" variant="outline">
                  Just Started
                </Badge>
              </TableCell>
              <TableCell className="hidden xl:table-cell">2023-06-26</TableCell>
              <TableCell className="text-right">$199.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Ava Davis</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  ava@example.com
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                Web Development Bootcamp
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge className="text-xs" variant="outline">
                  In Progress
                </Badge>
              </TableCell>
              <TableCell className="hidden xl:table-cell">2023-06-27</TableCell>
              <TableCell className="text-right">$299.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
