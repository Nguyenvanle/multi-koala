"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Book, CirclePlus, Home, ListRestart } from "lucide-react";
import { Form } from "@/components/ui/form";
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
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";
import useCreateCourseForm from "@/features/courses/hooks/useCreateCourseForm";

const breadcrumbs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  {
    label: "Course Management",
    href: "/dashboard/courses",
    icon: <Book className="w-4 h-4" />,
  },
  {
    label: "Add Course",
  },
];

export default function CreateCoursePage() {
  const { form, onSubmit, handleReset } = useCreateCourseForm();
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 xl:gap-6 ">
            <Breadcrumbs items={breadcrumbs} />
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <ListRestart className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                <CirclePlus className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:gap-6">
            <BasicInformationCard form={form} />

            <CourseTypesCard form={form} courseTypes={courseTypes} />
            <CourseFieldsCard form={form} fields={fields} />
          </div>
        </form>
      </Form>
    </div>
  );
}
