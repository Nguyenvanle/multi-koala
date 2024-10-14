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
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CourseFieldsCard({
  form,
  fields,
}: {
  form: UseFormReturn | any | undefined;
  fields: CourseFieldResType[] | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Lọc các trường khóa học dựa trên từ khóa tìm kiếm
  const filteredFields = fields?.filter((field: CourseFieldResType) =>
    field.fieldName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Course Fields</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Hide Fields <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show Fields <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <Input
            type="text"
            placeholder="Search course fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {!filteredFields ? (
              <Skeleton className="w-full h-52" />
            ) : (
              filteredFields.map((field: CourseFieldResType) => (
                <FormField
                  key={field.fieldName}
                  control={form.control}
                  name={`fields`}
                  render={({ field: formField }) => {
                    const isChecked = formField.value.includes(field.fieldName);
                    return (
                      <FormItem>
                        <FormControl>
                          <Badge
                            variant="outline"
                            className="w-full justify-start gap-2 py-2 px-3"
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const newFields = checked
                                  ? [...formField.value, field.fieldName]
                                  : formField.value.filter(
                                      (f: string) => f !== field.fieldName
                                    );
                                formField.onChange(newFields);
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
      )}
    </Card>
  );
}