import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { Control } from "react-hook-form";

export default function PasswordField({ control }: { control: Control<any> }) {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row flex-1 justify-between">
            <FormLabel>Password</FormLabel>
            <Link className="text-primary font-semibold text-sm" href={"#"}>
              Forgot your password?
            </Link>
          </div>
          <FormControl>
            <Input placeholder="Password123" type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
  