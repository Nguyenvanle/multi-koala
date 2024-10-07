import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CourseFieldResType } from "@/features/courses/types/course-field";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseFieldsCard({
  form,
  fields,
}: {
  form: UseFormReturn | any | undefined;
  fields: CourseFieldResType[] | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc các trường khóa học dựa trên từ khóa tìm kiếm
  const filteredFields = fields?.filter((field: CourseFieldResType) =>
    field.fieldName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Fields</CardTitle>

        <Input
          type="text"
          placeholder="Search course fields..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {!filteredFields ? (
            <Skeleton className="w-full h-52" />
          ) : (
            filteredFields.map((field: CourseFieldResType) => (
              <FormField
                key={field.fieldName}
                control={form.control}
                // Sử dụng mảng `fields` thay vì tên riêng biệt cho mỗi trường
                name={`fields`}
                render={({ field: formField }) => {
                  // Kiểm tra xem trường hiện tại có được chọn hay không
                  const isChecked = formField.value.includes(field.fieldName);

                  return (
                    <FormItem>
                      <FormControl>
                        <Badge
                          variant="outline"
                          className="w-full justify-start gap-2 py-2 px-3"
                        >
                          <Checkbox
                            checked={isChecked} // Kiểm tra xem checkbox đã được chọn chưa
                            onCheckedChange={(checked) => {
                              // Cập nhật danh sách `fields` khi checkbox được chọn hoặc bỏ chọn
                              const newFields = checked
                                ? [...formField.value, field.fieldName]
                                : formField.value.filter(
                                    (f: string) => f !== field.fieldName
                                  );
                              formField.onChange(newFields); // Thay đổi giá trị của `fields`
                            }}
                          />
                          <FormLabel
                            className="text-sm font-medium leading-none cursor-pointer"
                            title={field.fieldDescription}
                          >
                            {capitalizeFirstLetter(field.fieldName)}
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
