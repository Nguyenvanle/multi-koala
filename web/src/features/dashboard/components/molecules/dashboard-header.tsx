import { CardInfo } from "@/features/dashboard/components/atoms/card-info";
import { BookOpen, Users, GraduationCap, Activity } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardInfo
        title="Total Revenue"
        value="$12,345.67"
        icon={<BookOpen className="h-4 w-4 text-primary " />}
        description="+15.2% from last month"
      />
      <CardInfo
        title="Active Students"
        value="1,234"
        icon={<Users className="h-4 w-4 text-primary" />}
        description="+7.3% from last month"
      />
      <CardInfo
        title="Course Sales"
        value="456"
        icon={<GraduationCap className="h-4 w-4 text-primary " />}
        description="+22.4% from last month"
      />
      <CardInfo
        title="Average Rating"
        value="4.8"
        icon={<Activity className="h-4 w-4 text-primary " />}
        description="+0.2 from last month"
      />
    </div>
  );
}
