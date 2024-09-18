import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CoursesResultResType } from "@/features/courses/types/course";
import { TeacherBodyType } from "@/features/users/schema/teacher";
import {
  Star,
  MapPin,
  Mail,
  User,
  Calendar,
  Book,
  ArrowRight,
} from "lucide-react";
import { CoursesList } from "@/features/courses/components/organisms/courses-list";
import { InfoItem } from "@/features/users/components/atoms/info-item";

const TeacherProfile: React.FC<{
  teacher: TeacherBodyType;
  courses: CoursesResultResType;
  courseLoading: boolean;
}> = ({ teacher, courses, courseLoading }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {/* Avatar Section */}
        <Card className="col-span-1 shadow-lg ">
          <CardContent className="flex flex-col items-center justify-center border-b p-6">
            <Avatar className="w-40 h-40 lg:w-60 lg:h-60 border">
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
            <h2 className="mt-4 text-2xl font-bold ">
              {teacher.firstname} {teacher.lastname}
            </h2>
            <Badge className="mt-2 px-3 py-1 text-sm font-medium bg-primary text-white">
              {teacher.roles[0].roleName}
            </Badge>
          </CardFooter>
        </Card>

        {/* Teacher Details Section */}
        <Card className="col-span-1 md:col-span-2 shadow-lg">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-2xl font-bold  flex items-center">
              <User className="mr-2 text-primary" size={24} /> Teacher
              Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoItem icon={Mail} label="Email" value={teacher.email} />
              <InfoItem
                icon={Calendar}
                label="Birth Date"
                value={new Date(teacher.userBirth).toLocaleDateString()}
              />
              <InfoItem
                icon={MapPin}
                label="Hometown"
                value={teacher.userHometown}
              />
              <InfoItem
                icon={Star}
                label="Rating"
                value={`${(teacher.teacherRating * 5).toFixed(1)} / 5`}
                className="lg:col-span-1"
              />
              <div className="col-span-1 md:col-span-2 lg:col-span-4">
                <h3 className="text-lg font-semibold  flex items-center mb-2">
                  <Book className="mr-2 text-primary" size={20} /> Bio
                </h3>
                <p className="text-muted-foreground">{teacher.userBio}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Section */}
      <div className="col-span-1 md:col-span-3 bg-secondary p-8 pt-4">
        <h3 className="text-2xl font-bold flex items-center mb-4">
          <Book className="mr-2" size={24} /> Courses
        </h3>
        <CoursesList
          courses={courses}
          loading={courseLoading}
          className="lg:grid-cols-4"
        />
      </div>
    </div>
  );
};

export default TeacherProfile;
