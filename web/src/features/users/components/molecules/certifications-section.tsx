import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CertificationsResult } from "@/features/certification/types/certification-res";
import { Award } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { CertificationListEmpty } from "@/features/courses/components/molecules/certification-list-empty";

export const CertificationsSection: React.FC<{
  certifications: CertificationsResult | null; // Cho phép certifications là null
}> = ({ certifications }) => {
  // Kiểm tra nếu certifications không có hoặc là mảng rỗng
  if (!certifications || certifications.length === 0) {
    return (
      <div className="p-4 xl:p-6 pt-0 pb-6">
        <Card className="bg-background rounded-lg shadow-lg">
          <CardHeader className="px-6 py-4 border-b">
            <h3 className="text-2xl font-bold flex items-center">
              <Award className="mr-2 text-primary" size={24} /> Certifications
            </h3>
          </CardHeader>
          <CardFooter className="p-6 flex">
            <CertificationListEmpty
              title="No Certifications Found"
              message="It seems like you haven't received any certifications yet. Start your journey now!"
              buttonText="Browse Certification Options"
              redirect="#"
            />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 xl:p-6 pt-0 pb-6">
      <Card className="bg-background rounded-lg shadow-lg">
        <CardHeader className="px-6 py-4 border-b">
          <h3 className="text-2xl font-bold flex items-center">
            <Award className="mr-2 text-primary" size={24} /> Certifications
          </h3>
        </CardHeader>
        <CardFooter className="p-6 flex">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {certifications.map((cert, index) => (
              <Card key={index} className="">
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
        </CardFooter>
      </Card>
    </div>
  );
};
