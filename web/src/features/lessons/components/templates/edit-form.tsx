"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";
import { CourseImageCard } from "@/features/courses/components/organisms";
import VideoUploadForm from "@/features/file-upload/components/atoms/video-upload";
import DeleteLessonDialog from "@/features/lessons/components/atoms/delete-dialog";
import DemoField from "@/features/lessons/components/atoms/demo-field";
import LessonDescriptionField from "@/features/lessons/components/atoms/lesson-description";
import LessonNameField from "@/features/lessons/components/atoms/name-field";
import useEditLessonForm from "@/features/lessons/hooks/useEditForm";
import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import TestList from "@/features/test/components/atoms/test-list";
import { TestBodyType } from "@/features/test/types/test-result";
import { CirclePlus, Home, ListRestart, Loader2 } from "lucide-react";
import { useEffect } from "react";

const breadcrumbs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  { label: "Course Management", href: "/dashboard/courses" },
  { label: "Edit Lesson" },
];

export default function EditLessonForm({
  initData,
  initTestData,
}: {
  initData: LessonDetailResult;
  initTestData: TestBodyType[];
}) {
  const { form, onSubmit, isSubmitting } = useEditLessonForm(initData);

  useEffect(() => {
    console.log(initTestData);
  }, [initTestData]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col lg:flex-row justify-between gap-4 xl:gap-6 ">
            <Breadcrumbs items={breadcrumbs} />
            <div className="flex gap-2">
              <DeleteLessonDialog
                lessonId={initData.lessonId}
                courseId={initData.course.courseId}
              />
              <Button
                type="button"
                onClick={() => form.reset()}
                variant="outline"
                className="w-full sm:w-auto h-8"
              >
                <ListRestart className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto h-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CirclePlus className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <CourseImageCard
                form={form}
                initialImageUrl={initData.image?.imageUrl}
              />
              <Card className="flex flex-col gap-4">
                <CardHeader className="pb-0">
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <LessonNameField form={form} />
                  <DemoField form={form} />
                  <LessonDescriptionField form={form} />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-4">
              <VideoUploadForm initData={initData} />
              <TestList
                tests={initTestData}
                viewDetailHref={`/dashboard/courses/${initData.course.courseId}/lessons/${initData.lessonId}/tests`}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
