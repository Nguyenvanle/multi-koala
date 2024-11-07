import { AddFormValues } from "@/features/lessons/types/add-form";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LessonDescriptionField({
  form,
}: {
  form: UseFormReturn<AddFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="lessonDescription"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Lesson Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Describe the content of your lesson."
              type="text"
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
