import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditFormType } from "@/features/lessons/types/edit-form";
import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import { UseFormReturn } from "react-hook-form";

export default function VideoLessonField({
  form,
  initData,
}: {
  form: UseFormReturn<EditFormType>;
  initData?: LessonDetailResult;
}) {
  return (
    <FormField
      control={form.control}
      name="videoFile"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row justify-between">
            <FormLabel>Video Upload</FormLabel>
            <FormMessage />
          </div>
          <FormControl>
            <Input type="file" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
