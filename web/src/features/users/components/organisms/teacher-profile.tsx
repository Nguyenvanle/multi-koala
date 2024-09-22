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
import { CertificationsResult } from "@/features/certification/types/certification-res";
import {
  Star,
  MapPin,
  Mail,
  User,
  Calendar,
  Book,
  ArrowRight,
  Award,
} from "lucide-react";
import { CoursesList } from "@/features/courses/components/organisms/courses-list";
import { InfoItem } from "@/features/users/components/atoms/info-item";
import { P } from "@/components/ui/typography";
import { formatDate } from "@/lib/utils";

const TeacherProfile: React.FC<{
  teacher: TeacherBodyType;
  courses: CoursesResultResType;
  courseLoading: boolean;
  certifications: CertificationsResult;
}> = ({ teacher, courses, courseLoading, certifications }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 space-y-6 lg:grid-cols-3 lg:space-x-6 lg:space-y-0 p-8 bg-secondary">
        {/* Avatar Section */}
        <Card className="col-span-1 shadow-lg ">
          <CardContent className="flex flex-col items-center justify-center border-b p-6">
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
          <CardHeader className="border-b pb-4 rounded-t">
            <CardTitle className="text-2xl font-bold  flex items-center ">
              <User className="mr-2 text-primary" size={24} /> Teacher
              Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InfoItem icon={Mail} label="Email" value={teacher.email} />
              <InfoItem
                icon={Calendar}
                label="Birth Date"
                value={formatDate(teacher.userBirth.toString())}
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
              />
              <div className="col-span-1  lg:col-span-2">
                <h3 className="text-lg font-semibold  flex items-center mb-2">
                  <Book className="mr-2 text-primary" size={20} /> Bio
                </h3>
                <p className="text-muted-foreground">{teacher.userBio}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certifications Section */}
      <div className="p-8 pt-4">
        <h3 className="text-2xl font-bold flex items-center mb-4">
          <Award className="mr-2 text-primary" size={24} /> Certifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader>
                <CardTitle>{cert.certificateName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mt-2">Issued by: {cert.issuingOrganization}</p>
                <p>Date: {formatDate(cert.issueDate.toString())}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Courses Section */}
      <div className="col-span-1 md:col-span-3  p-8 pt-4">
        <h3 className="text-2xl font-bold flex items-center ">
          <Book className="mr-2 text-primary" size={24} />
          Courses
        </h3>
        <P className="text-muted-foreground mb-4">
          Explore the courses offered by this teacher. You will find a variety
          of subjects tailored to enhance your knowledge and skills. Join now to
          begin your learning journey!
        </P>
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