import { H1 } from "@/components/ui/typography";

export const CoursesListEmpty: React.FC = () => (
  <div className="flex items-center justify-center w-full h-[500px]">
    <H1 className="text-center text-muted-foreground">NO COURSE FOUND</H1>
  </div>
);
