import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestBodyType } from "@/features/test/types/test-result";
import { MoreHorizontal, Eye, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const TestCard = ({
  test,
  viewDetailHref,
}: {
  test: TestBodyType;
  viewDetailHref: string;
}) => (
  <Card className="mb-4 last:mb-0">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-medium">
        {test.testDescription}
      </CardTitle>
      <Badge variant={test.status === "IN_EDITING" ? "secondary" : "default"}>
        {test.status}
      </Badge>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Passing Score: {test.passingScore}
          </p>
          <p className="text-sm text-muted-foreground">
            Questions: {test.questions.length}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`${viewDetailHref}/${test.testId}`}
                className="flex flex-row w-full"
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>View Details</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`${viewDetailHref}/${test.testId}/edit`}
                className="flex flex-row w-full"
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  </Card>
);
