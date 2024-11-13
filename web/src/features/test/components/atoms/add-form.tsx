"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useExamAddForm from "@/features/test/hooks/useExamAddForm";

interface ExamAddFormProps {
  onSuccess?: () => void;
}

export default function ExamAddForm({ onSuccess }: ExamAddFormProps) {
  const { form, onSubmit } = useExamAddForm();

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting exam form:", error);
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
        <FormField
          control={form.control}
          name="testDescription"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row justify-between">
                <FormLabel>Exam Name</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  placeholder="This is the name that represents your exam."
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
