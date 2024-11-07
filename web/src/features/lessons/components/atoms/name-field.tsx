import { AddFormValues } from "@/features/lessons/types/add-form";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LessonNameField({
  form,
}: {
  form: UseFormReturn<AddFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="lessonName"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row justify-between">
            <FormLabel>Lesson Name</FormLabel>
            <FormMessage />
          </div>
          <FormControl>
            <Input
              placeholder="This is the name that represents your lesson."
              type="text"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
