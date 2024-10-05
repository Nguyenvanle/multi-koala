import { H1 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface CoursesListEmptyProps {
  title: string;
  message: string;
  buttonText: string;
  redirect: string;
}

export const CoursesListEmpty: React.FC<CoursesListEmptyProps> = ({
  title,
  message,
  buttonText,
  redirect,
}) => (
  <div className="flex flex-col items-center justify-center w-full h-[500px] text-center">
    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
    <H1 className="text-muted-foreground mb-2">{title}</H1>
    <p className="text-muted-foreground mb-4">{message}</p>
    <Button>
      <Link href={redirect}>{buttonText}</Link>
    </Button>
  </div>
);
