import { AddFormValues } from "@/features/lessons/types/add-form";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

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
        <FormItem className="w-full">
          <div className="flex flex-row justify-between w-full">
            <FormLabel>Description</FormLabel>
            <FormMessage />
          </div>
          <FormControl>
            <Textarea
              placeholder="Describe the content of your lesson."
              className="w-full resize-y"
              rows={4} // Set initial height to 3 rows
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}