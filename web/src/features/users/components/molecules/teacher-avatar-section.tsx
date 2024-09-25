import { TeacherBodyType } from "@/features/users/schema/teacher";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const TeacherAvatarSection: React.FC<{ teacher: TeacherBodyType }> = ({
  teacher,
}) => (
  <Card className="col-span-1 shadow-lg">
    <CardContent className="flex flex-col items-center justify-center p-6 pb-0">
      <Avatar className="w-60 h-60 border">
        <AvatarImage
          src={teacher.image.imageUrl}
          alt={`${teacher.firstname} ${teacher.lastname}`}
        />
        <AvatarFallback>
          {teacher.firstname[0]}
          {teacher.lastname[0]}
        </AvatarFallback>
      </Avatar>
    </CardContent>
    <CardFooter className="flex flex-col">
      <h2 className="mt-4 text-2xl font-bold">
        {teacher.firstname} {teacher.lastname}
      </h2>
      <Badge className="mt-2 px-3 py-1 text-sm font-medium bg-primary text-white">
        {teacher.roles[0].roleName}
      </Badge>
    </CardFooter>
  </Card>
);
