"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { CourseBodyType } from "@/features/courses/types/course";

type CourseFormData = z.infer<typeof CourseBodyType>;

export default function CourseEditForm({
  initialData,
}: {
  initialData: CourseFormData;
}) {
  const [previewImage, setPreviewImage] = useState(initialData.image.imageUrl);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(CourseBodyType),
    defaultValues: initialData,
  });

  const {
    fields: typeFields,
    append: appendType,
    remove: removeType,
  } = useFieldArray({
    control,
    name: "types",
  });

  const {
    fields: fieldFields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control,
    name: "fields",
  });

  const onSubmit = (data: CourseFormData) => {
    console.log(data);
    // Here you would typically send the data to your API
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit Course Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input id="courseName" {...register("courseName")} />
            {errors.courseName && (
              <p className="text-red-500 text-sm">
                {errors.courseName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coursePrice">Price</Label>
            <Input
              id="coursePrice"
              type="number"
              step="0.01"
              {...register("coursePrice", { valueAsNumber: true })}
            />
            {errors.coursePrice && (
              <p className="text-red-500 text-sm">
                {errors.coursePrice.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseDescription">Description</Label>
            <Textarea
              id="courseDescription"
              {...register("courseDescription")}
            />
            {errors.courseDescription && (
              <p className="text-red-500 text-sm">
                {errors.courseDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseLevel">Level</Label>
            <Controller
              name="courseLevel"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.courseLevel && (
              <p className="text-red-500 text-sm">
                {errors.courseLevel.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {typeFields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-2">
              <Input
                {...register(`types.${index}.typeName`)}
                placeholder="Type Name"
              />
              <Textarea
                {...register(`types.${index}.typeDescription`)}
                placeholder="Type Description"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeType(index)}
              >
                <X className="h-4 w-4 mr-2" /> Remove Type
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendType({ typeName: "", typeDescription: "" })}
          >
            Add Type
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Fields</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fieldFields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-2">
              <Input
                {...register(`fields.${index}.fieldName`)}
                placeholder="Field Name"
              />
              <Textarea
                {...register(`fields.${index}.fieldDescription`)}
                placeholder="Field Description"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeField(index)}
              >
                <X className="h-4 w-4 mr-2" /> Remove Field
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendField({ fieldName: "", fieldDescription: "" })}
          >
            Add Field
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              {...register("image.imageUrl")}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
            {errors.image?.imageUrl && (
              <p className="text-red-500 text-sm">
                {errors.image.imageUrl.message}
              </p>
            )}
          </div>
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Course preview"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
