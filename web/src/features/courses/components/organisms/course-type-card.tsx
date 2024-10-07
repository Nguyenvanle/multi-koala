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

export default function CourseTypesCard({
  form,
  courseTypes,
}: {
  form: UseFormReturn | any | undefined;
  courseTypes: CourseType[] | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc các loại khóa học dựa trên từ khóa tìm kiếm
  const filteredCourseTypes = courseTypes?.filter((type: CourseType) =>
    type.typeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Course Types</CardTitle>

        <Input
          type="text"
          placeholder="Search course types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
      </CardHeader>
      <CardContent>
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
                  // Kiểm tra xem loại khóa học hiện tại có được chọn hay không
                  const isChecked = formField.value.includes(type.typeName);

                  return (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Badge
                          variant="outline"
                          className="w-full justify-start gap-2 py-2 px-3"
                        >
                          <Checkbox
                            checked={isChecked} // Kiểm tra xem checkbox đã được chọn chưa
                            onCheckedChange={(checked) => {
                              // Cập nhật danh sách `types` khi checkbox được chọn hoặc bỏ chọn
                              const newTypes = checked
                                ? [...formField.value, type.typeName]
                                : formField.value.filter(
                                    (t: string) => t !== type.typeName
                                  );
                              formField.onChange(newTypes); // Thay đổi giá trị của `types`
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
    </Card>
  );
}
