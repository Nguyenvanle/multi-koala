import { AddFormValues } from "@/features/lessons/types/add-form";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export default function DemoField({
  form,
}: {
  form: UseFormReturn<AddFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="demo"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
          <div className="space-y-0.5">
            <FormLabel>Demo</FormLabel>
            <FormDescription>
              Can you present this lesson to students who have not yet
              registered?
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-readonly
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
