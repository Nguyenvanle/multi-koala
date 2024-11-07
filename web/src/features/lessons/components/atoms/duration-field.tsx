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

export default function VideoDurationField({
  form,
}: {
  form: UseFormReturn<AddFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="videoDuration"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Duration</FormLabel>
          <FormControl>
            <Input
              placeholder="This is the minimum time it takes to complete your lesson."
              type="number"
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
