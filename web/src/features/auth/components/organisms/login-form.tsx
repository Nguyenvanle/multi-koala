"use client";

import { Button } from "@/components/ui/button";
import UsernameField from "@/features/auth/components/molecules/username-field";
import { Form } from "@/components/ui/form";
import useLoginForm from "@/features/auth/hooks/useLoginForm";
import PasswordField from "@/features/auth/components/molecules/password-field";
import { Icons } from "@/components/ui/icons";
import { H1, P } from "@/components/ui/typography";
import Link from "next/link";

export default function LoginForm() {
  const { form, onSubmit } = useLoginForm();
  const isSubmitting = form.formState.isSubmitting; // Check if the form is submitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-md space-y-4 xl:space-y-6 p-4 xl:p-6 flex-1 border rounded shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background"
      >
        <div className="flex flex-1 justify-center">
          <H1>Login</H1>
        </div>
        <UsernameField control={form.control} />
        <PasswordField control={form.control} />

        <div className="flex flex-1 flex-col">
          <Button type="submit" className="flex flex-1" disabled={isSubmitting}>
            {isSubmitting ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>

          <div className="flex flex-row pt-2 justify-center gap-2">
            <P className="flex flex-1 justify-between gap-2">
              Don&apos;t have an account?{" "}
              <Link
                href={"/register"}
                className="font-semibold text-primary text-sm"
              >
                Sign up
              </Link>
            </P>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.facebook className="mr-2 h-5 w-5 text-foreground" />
              Facebook
            </Button>
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
