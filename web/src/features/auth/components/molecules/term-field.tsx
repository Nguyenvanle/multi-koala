import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterBodyType } from "@/types/auth/schema/register";
import Link from "next/link";
import { Control } from "react-hook-form";

export default function TermField({
  control,
}: {
  control: Control<RegisterBodyType, any>;
}) {
  return (
    <FormField
      control={control}
      name="terms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link className="font-bold" href={"/register"}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="font-bold" href={"/register"}>
                Privacy Policy
              </Link>
            </label>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
