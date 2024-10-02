'use client'

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import useCreateCourseForm from "@/features/courses/hooks/useCreateCourseForm";
import useField from "@/features/field/hooks/useField";
import useCourseType from "@/features/course-type/hooks/useCourseType";
import {
  ErrorMessage,
  LoadingSkeleton,
} from "@/features/courses/components/atoms/create-course-data-handler";
import {
  BasicInformationCard,
  CourseFieldsCard,
  CourseImageCard,
  CourseTypesCard,
} from "@/features/courses/components/organisms";

export default function CreateCoursePage() {
  const { form, onSubmit } = useCreateCourseForm();
  const { fields, loading: fieldsLoading, error: fieldsError } = useField();
  const {
    courseTypes,
    loading: typesLoading,
    error: typesError,
  } = useCourseType();

  if (fieldsLoading || typesLoading) {
    return <LoadingSkeleton />;
  }

  if (fieldsError || typesError) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicInformationCard form={form} />
          <CourseTypesCard form={form} courseTypes={courseTypes} />
          <CourseFieldsCard form={form} fields={fields} />
          <CourseImageCard form={form} />

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
              type="button"
              onClick={() => form.reset()}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Undo2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Create Course
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}








