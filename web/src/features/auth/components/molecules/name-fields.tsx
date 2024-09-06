import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterBodyType } from "@/types/auth/schema/register";
import { Control } from "react-hook-form";

export default function NameFields({
  control,
}: {
  control: Control<RegisterBodyType, any>;
}) {
  return (
    <div className="flex flex-row gap-4">
      <FormField
        control={control}
        name="firstname"
        render={({ field }) => (
          <FormItem className="flex flex-1 flex-col">
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="lastname"
        render={({ field }) => (
          <FormItem className="flex flex-1 flex-col">
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
