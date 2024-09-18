import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const TeacherProfile: React.FC<{
  teacher: TeacherBodyType;
  courses: CoursesResultResType;
}> = ({ teacher, courses }) => {
  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <Card className="col-span-1 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src={teacher.image.imageUrl}
                alt={`${teacher.firstname} ${teacher.lastname}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {teacher.firstname} {teacher.lastname}
            </h2>
            <Badge className="mt-2 px-3 py-1 text-sm font-medium bg-primary text-white">
              {teacher.roles[0].roleName}
            </Badge>
          </CardContent>
        </Card>

        {/* Teacher Details Section */}
        <Card className="col-span-1 md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <User className="mr-2" size={24} /> Teacher Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center">
                <Mail className="mr-2 text-primary" size={20} />
                <div>
                  <dt className="font-medium text-gray-500">Email:</dt>
                  <dd className="text-gray-800">{teacher.email}</dd>
                </div>
              </div>
              <div className="flex items-center">
                <User className="mr-2 text-primary" size={20} />
                <div>
                  <dt className="font-medium text-gray-500">Username:</dt>
                  <dd className="text-gray-800">{teacher.username}</dd>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 text-primary" size={20} />
                <div>
                  <dt className="font-medium text-gray-500">Birth Date:</dt>
                  <dd className="text-gray-800">
                    {new Date(teacher.userBirth).toLocaleDateString()}
                  </dd>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 text-primary" size={20} />
                <div>
                  <dt className="font-medium text-gray-500">Hometown:</dt>
                  <dd className="text-gray-800">{teacher.userHometown}</dd>
                </div>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium text-gray-500 flex items-center">
                  <Book className="mr-2 text-primary" size={20} /> Bio:
                </dt>
                <dd className="text-gray-800 mt-1">{teacher.userBio}</dd>
              </div>
              <div className="flex items-center">
                <Star className="mr-2 text-yellow-400" size={20} />
                <div>
                  <dt className="font-medium text-gray-500">Rating:</dt>
                  <dd className="text-gray-800">
                    {(teacher.teacherRating * 5).toFixed(1)} / 5
                  </dd>
                </div>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <Card className="col-span-1 md:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <Book className="mr-2" size={24} /> Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.courseId}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={course.image.imageUrl || "/api/placeholder/400/200"}
                      alt={course.courseName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {course.courseName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {course.courseDescription}
                    </p>
                    <Link
                      href={`/courses/${course.courseId}`}
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
                    >
                      View Course <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;
