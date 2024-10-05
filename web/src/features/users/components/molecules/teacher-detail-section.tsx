import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeacherBodyType } from "@/features/users/schema/teacher";
import { InfoItem } from "@/features/users/components/atoms/info-item";
import TeacherRatingItem from "@/features/users/components/atoms/rating-item";
import { User, Mail, Calendar, MapPin, Book } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const TeacherDetailsSection: React.FC<{ teacher: TeacherBodyType }> = ({
  teacher,
}) => (
  <Card className="col-span-1 md:col-span-2 shadow-lg">
    <CardHeader className="border-b pb-4 rounded-t">
      <CardTitle className="text-2xl font-bold flex items-center">
        <User className="mr-2 text-primary" size={24} /> Teacher Information
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-6 border-b">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoItem icon={Mail} label="Email" value={teacher.email} />
        <InfoItem
          icon={Calendar}
          label="Birth Date"
          value={
            teacher.userBirth
              ? formatDate(teacher.userBirth?.toString())
              : "Not specified"
          }
          className={!teacher.userBirth ? "text-muted-foreground" : ""}
        />
        <InfoItem
          icon={MapPin}
          label="Hometown"
          value={teacher.userHometown || "Not specified"}
          className={!teacher.userHometown ? "text-muted-foreground" : ""}
        />
        <TeacherRatingItem
          initialData={{ avgteacherRating: 0 }}
          teacherId={teacher.userId}
        />
      </div>
    </CardContent>
    <CardFooter className="pt-6">
      <div className="col-span-1 lg:col-span-2">
        <h3 className="text-lg font-semibold flex items-center mb-2">
          <Book className="mr-2 text-primary" size={20} /> Bio
        </h3>
        <p className="text-muted-foreground">{teacher.userBio}</p>
      </div>
    </CardFooter>
  </Card>
);
