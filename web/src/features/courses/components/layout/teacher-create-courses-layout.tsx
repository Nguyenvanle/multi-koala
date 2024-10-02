'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Minus, Undo2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import useCreateCourseForm from "@/features/courses/hooks/useCreateCourseForm";
import useField from "@/features/field/hooks/useField";
import useCourseType from "@/features/course-type/hooks/useCourseType";

const CreateCoursePage = () => {
  const { form, onSubmit } = useCreateCourseForm();
  const { fields, loading: fieldsLoading, error: fieldsError } = useField();
  const { courseTypes, loading: typesLoading, error: typesError } = useCourseType();

  if (fieldsLoading || typesLoading) return <div>Loading...</div>;
  if (fieldsError || typesError) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="courseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter course name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter course description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coursePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter course price"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Types</CardTitle>
            </CardHeader>
            <CardContent>
              {courseTypes?.map((type, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`types.${index}`} // Thay đổi để chỉ định đúng key
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value !== undefined} // Kiểm tra xem trường có giá trị hay không
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? type : undefined); // Chọn hoặc bỏ chọn
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{type.typeName}</FormLabel>
                        <p className="text-sm text-muted-foreground">{type.typeDescription}</p>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Fields</CardTitle>
            </CardHeader>
            <CardContent>
              {fields?.map((field, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`fields.${index}`} // Chỉ định đúng key
                  render={({ field: formField }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox
                          checked={formField.value !== undefined} // Kiểm tra giá trị
                          onCheckedChange={(checked) => {
                            formField.onChange(checked ? field : undefined); // Chọn hoặc bỏ chọn
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{field.fieldName}</FormLabel>
                        <p className="text-sm text-muted-foreground">{field.fieldDescription}</p>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Image</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="image.imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter course image URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* You can add an UploadButton component here if you want to allow image uploads */}
              {/* <Button>Upload Image</Button> */}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={() => form.reset()}
              variant="outline"
            >
              <Undo2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button type="submit">Create Course</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCoursePage;