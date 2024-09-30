"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import useVerifyForm from "@/features/auth/hooks/useVerifyForm";

export default function OTPField() {
  const { form, onSubmit } = useVerifyForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex items-center flex-col"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border-primary ring-0" />
                    <InputOTPSlot index={1} className="border-primary ring-0" />
                    <InputOTPSlot index={2} className="border-primary ring-0" />
                    <InputOTPSlot index={3} className="border-primary ring-0" />
                    <InputOTPSlot index={4} className="border-primary ring-0" />
                    <InputOTPSlot
                      index={5}
                      className="border-primary ring-0 "
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
