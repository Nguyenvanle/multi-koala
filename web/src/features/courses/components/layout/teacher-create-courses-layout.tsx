"use client";
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
import useCreateCourseForm from "@/features/courses/hooks/useCreateCourseForm";

const CreateCoursePage = () => {
  const { form, onSubmit, addType, removeType, addField, removeField } =
    useCreateCourseForm();

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
              <CardTitle className="flex justify-between items-center">
                Course Types
                <Button
                  onClick={addType}
                  type="button"
                  variant="outline"
                  size="sm"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Type
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {form.watch("types").map((_, index) => (
                <div key={index} className="mb-4 p-4 border rounded-md">
                  <FormField
                    control={form.control}
                    name={`types.${index}.typeName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter course type name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`types.${index}.typeDescription`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter course type description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => removeType(index)}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <Minus className="mr-2 h-4 w-4" /> Remove Type
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Course Fields
                <Button
                  onClick={addField}
                  type="button"
                  variant="outline"
                  size="sm"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Field
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {form.watch("fields").map((_, index) => (
                <div key={index} className="mb-4 p-4 border rounded-md">
                  <FormField
                    control={form.control}
                    name={`fields.${index}.fieldName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter field name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`fields.${index}.fieldDescription`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter field description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => removeField(index)}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <Minus className="mr-2 h-4 w-4" /> Remove Field
                  </Button>
                </div>
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
                      <Input {...field} placeholder="Enter course image URL" />
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
