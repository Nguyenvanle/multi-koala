import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TeacherOverviewCard = ({ icon: Icon, title, value, color }: any) => (
  <Card className="flex-1">
    <CardContent className="flex items-start p-4">
      <div className={`p-4 rounded-lg mr-4 ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex flex-col self-stretch justify-between">
        <p className="text-sm text-gray-500 line-clamp-1" title={title}>
          {title}
        </p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default TeacherOverviewCard;
