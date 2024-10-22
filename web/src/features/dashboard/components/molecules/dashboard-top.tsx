import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardTopPerformingCourses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              src="/placeholder.svg?height=36&width=36"
              alt="Course"
            />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Advanced React Patterns
            </p>
            <p className="text-sm text-muted-foreground">
              4.9 ★ (2,345 reviews)
            </p>
          </div>
          <div className="ml-auto font-medium">$15,999.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              src="/placeholder.svg?height=36&width=36"
              alt="Course"
            />
            <AvatarFallback>PD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Python for Data Science
            </p>
            <p className="text-sm text-muted-foreground">
              4.8 ★ (1,890 reviews)
            </p>
          </div>
          <div className="ml-auto font-medium">$12,499.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              src="/placeholder.svg?height=36&width=36"
              alt="Course"
            />
            <AvatarFallback>UX</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              UX/UI Design Fundamentals
            </p>
            <p className="text-sm text-muted-foreground">
              4.7 ★ (1,567 reviews)
            </p>
          </div>
          <div className="ml-auto font-medium">$9,999.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              src="/placeholder.svg?height=36&width=36"
              alt="Course"
            />
            <AvatarFallback>ML</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Machine Learning Basics
            </p>
            <p className="text-sm text-muted-foreground">
              4.6 ★ (1,234 reviews)
            </p>
          </div>
          <div className="ml-auto font-medium">$7,999.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              src="/placeholder.svg?height=36&width=36"
              alt="Course"
            />
            <AvatarFallback>WD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Web Development Bootcamp
            </p>
            <p className="text-sm text-muted-foreground">4.5 ★ (987 reviews)</p>
          </div>
          <div className="ml-auto font-medium">$5,999.00</div>
        </div>
      </CardContent>
    </Card>
  );
}
