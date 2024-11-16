"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import DemoField from "@/features/lessons/components/atoms/demo-field";
import LessonDescriptionField from "@/features/lessons/components/atoms/lesson-description";
import LessonNameField from "@/features/lessons/components/atoms/name-field";
import useAddForm from "@/features/lessons/hooks/useAddForm";

interface LessonAddFormProps {
  onSuccess?: () => void;
}

export default function LessonAddForm({ onSuccess }: LessonAddFormProps) {
  const { form, onSubmit } = useAddForm();

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting lesson form:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(handleSubmit)(e);
        }}
        className="flex flex-col gap-4 max-w-3xl"
      >
        <LessonNameField form={form} />
        <LessonDescriptionField form={form} />
        <DemoField form={form} />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
