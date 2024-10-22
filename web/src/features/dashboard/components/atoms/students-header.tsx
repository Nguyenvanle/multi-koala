import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";
import { Home, Search } from "lucide-react";
import React from "react";

const breadcrumbs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  { label: "Student Management" },
];

export default function StudentHeader() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-row items-center gap-2 w-full md:max-w-96">
        <div className="relative flex-grow ">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search for students names..."
            // onChange={handleSearch}
            className="pl-8 focus:border-accent"
          />
        </div>
      </div>
    </>
  );
}
