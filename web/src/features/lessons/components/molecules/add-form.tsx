"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import DemoField from "@/features/lessons/components/atoms/demo-field";
import VideoDurationField from "@/features/lessons/components/atoms/duration-field";
import LessonDescriptionField from "@/features/lessons/components/atoms/lesson-description";
import LessonNameField from "@/features/lessons/components/atoms/name-field";
import useAddForm from "@/features/lessons/hooks/useAddForm";

export default function LessonAddForm() {
  const { form, onSubmit } = useAddForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-3xl"
      >
        <LessonNameField form={form} />
        <LessonDescriptionField form={form} />
        <VideoDurationField form={form} />
        <DemoField form={form} />
      </form>
    </Form>
  );
}
