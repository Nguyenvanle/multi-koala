import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { convertDuration } from "@/lib/utils";
import { Muted, P } from "@/components/ui/typography";
import { useMemo } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function DetailCard({
  courseName,
  coursePrice,
  courseDescription,
  uploadByTeacher,
  totalDuration,
  totalLessons,
}: {
  courseName: string;
  coursePrice: number;
  courseDescription: string;
  uploadByTeacher: string;
  totalDuration: number | null;
  totalLessons: number | null;
}) {
  const discount: number = 0.2;
  const discountedPrice = useMemo(
    () => coursePrice - coursePrice * discount,
    [coursePrice]
  );

  // Kiểm tra totalDuration, nếu null thì sử dụng 0
  const { hours, minutes, seconds } = convertDuration(totalDuration || 0);

  const router = useRouter();

  return (
    <Card className="flex flex-1 flex-col w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex-row justify-between pb-4 items-center">
        <Link href={""} className="hover:text-primary mt-1.5 font-medium">
          {uploadByTeacher}
        </Link>
        <Badge className="rounded-xl">⭐ 4.5</Badge>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-4">
        <CardTitle className="line-clamp-2">{courseName}</CardTitle>
        <Muted>
          {hours > 0
            ? `${hours}h ${minutes}m ${seconds}'`
            : `${minutes}m ${seconds}'`}{" "}
          • {totalLessons} lessons
        </Muted>

        <P>{courseDescription}</P>
      </CardContent>

      <CardFooter className="flex flex-0">
        <Button
          className="flex-1 space-x-1"
          onClick={() => {
            toast({
              title: "Login Required",
              description: "Please log in to your account to purchase courses.",
              duration: 5000,
            });

            router.push("/login");
          }}
        >
          <span className="font-bold text-primary-foreground">{`$${discountedPrice.toFixed(
            2
          )}`}</span>
          <Muted className="line-through">{`/${coursePrice.toFixed(2)}`}</Muted>
        </Button>
      </CardFooter>
    </Card>
  );
}