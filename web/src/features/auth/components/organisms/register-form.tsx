"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import useRegisterForm from "@/features/auth/hooks/useRegisterForm";
import UsernameField from "@/features/auth/components/molecules/username-field";
import NameFields from "@/features/auth/components/molecules/name-fields";
import EmailField from "@/features/auth/components/molecules/email-field";
import { Form } from "@/components/ui/form";
import PasswordFields from "@/features/auth/components/molecules/password-fields";
import TermField from "@/features/auth/components/molecules/term-field";
import { H1, H2, H3, H4, Muted, P } from "@/components/ui/typography";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OTPField from "@/features/auth/components/molecules/otp-field";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";

export default function RegisterForm() {
  const { form, onSubmit } = useRegisterForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isSubmitting = form.formState.isSubmitting; // Check if the form is submitting

  const handleSubmit = async (data: any) => {
    const isValid = await form.trigger();
    if (isValid) {
      // setIsDialogOpen(true);
      await onSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 flex-1 w-full max-w-md border rounded shadow-lg hover:shadow-xl p-4 xl:p-6 bg-background"
      >
        <div className="flex flex-1 justify-center">
          <H1>Sign Up</H1>
        </div>
        <UsernameField control={form.control} />
        <NameFields control={form.control} />
        <EmailField control={form.control} />
        <PasswordFields control={form.control} />
        <TermField control={form.control} />

        <div className="flex flex-1 flex-col space-y-4">
        <Button type="submit" className="flex flex-1" disabled={isSubmitting}>
            {isSubmitting ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>

          <div className="flex flex-row flex-1 justify-between items-center">
            <P className="text-sm">You already have an account? </P>
            <Link
              href={"/login"}
              className="font-semibold text-primary text-sm  text-center"
            >
              Login
            </Link>
          </div>
        </div>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex flex-1 justify-center px-4 ">
          <DialogHeader className="flex flex-1 flex-col gap-6  max-w-md justify-center text-center">
            <div className="flex flex-col gap-2">
              <DialogTitle>Verify Your Account</DialogTitle>
              <DialogDescription>
                We are sending a OTP to validate your email, Hang on!
              </DialogDescription>
            </div>

            <div className="flex w-full justify-center content-center items-center ">
              <OTPField />
            </div>
            <div className="flex justify-end">
              <Muted>
                A email has been sent to{" "}
                <span className="font-semibold text-foreground">
                  {form.getValues("email")}
                </span>
              </Muted>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
