import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CourseType } from "@/features/course-type/types/course-type";
import { UseFormReturn } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react"; // Assume you're using lucide-react for icons

export default function CourseTypesCard({
  form,
  courseTypes,
}: {
  form: UseFormReturn | any | undefined;
  courseTypes: CourseType[] | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Lọc các loại khóa học dựa trên từ khóa tìm kiếm
  const filteredCourseTypes = courseTypes?.filter((type: CourseType) =>
    type.typeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Course Types</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Hide Types <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show Types <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <Input
            type="text"
            placeholder="Search course types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {!filteredCourseTypes ? (
              <Skeleton className="w-full h-52" />
            ) : (
              filteredCourseTypes.map((type: CourseType) => (
                <FormField
                  key={type.typeName}
                  control={form.control}
                  name={`types`}
                  render={({ field: formField }) => {
                    const isChecked = formField.value.includes(type.typeName);
                    return (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Badge
                            variant="outline"
                            className="w-full justify-start gap-2 py-2 px-3"
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const newTypes = checked
                                  ? [...formField.value, type.typeName]
                                  : formField.value.filter(
                                      (t: string) => t !== type.typeName
                                    );
                                formField.onChange(newTypes);
                              }}
                            />
                            <FormLabel
                              className="text-sm font-medium leading-none cursor-pointer"
                              title={type.typeDescription}
                            >
                              {capitalizeFirstLetter(type.typeName)}
                            </FormLabel>
                          </Badge>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}