"use client";

import { CourseBodyType } from "@/features/courses/types/course";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import {
  ErrorMessage,
  LoadingSkeleton,
} from "@/features/courses/components/atoms/create-course-data-handler";
import useCourseType from "@/features/course-type/hooks/useCourseType";
import useField from "@/features/field/hooks/useField";
import { Book, CirclePlus, Home, ListRestart } from "lucide-react";
import {
  BasicInformationCard,
  CourseFieldsCard,
  CourseImageCard,
  CourseTypesCard,
} from "@/features/courses/components/organisms";
import useEditCourseForm, {
  EditCourseFormData,
} from "@/features/courses/hooks/useEditCourseForm";
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";

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
    label: "Edit Course",
  },
];

export default function CourseEditForm({
  initialData,
}: {
  initialData: EditCourseFormData;
}) {
  const { form, onSubmit, handleReset } = useEditCourseForm(initialData);
  const { fields, loading: fieldsLoading, error: fieldsError } = useField();
  const {
    courseTypes,
    loading: typesLoading,
    error: typesError,
  } = useCourseType();

  // Lấy giá trị hiện tại của form
  const currentFormData = form.watch();

  // So sánh currentFormData với initialData
  const isFormUnchanged =
    JSON.stringify(currentFormData) === JSON.stringify(initialData);

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
          <div className="flex flex-col xl:flex-row justify-between gap-4 xl:gap-6 ">
            <Breadcrumbs items={breadcrumbs} />
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto "
                disabled={isFormUnchanged}
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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
            <div className="flex flex-1 flex-col gap-4 xl:gap-6">
              <CourseImageCard
                form={form}
                initialImageUrl={initialData.imageUrl}
              />
              <BasicInformationCard form={form} />
            </div>
            <div className="flex flex-col gap-4 xl:gap-6">
              <CourseTypesCard form={form} courseTypes={courseTypes} />
              <CourseFieldsCard form={form} fields={fields} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
