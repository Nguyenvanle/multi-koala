"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useRegisterForm from "@/features/auth/hooks/useRegister";
import UsernameField from "@/features/auth/components/molecules/username-field";
import NameFields from "@/features/auth/components/molecules/name-fields";
import EmailField from "@/features/auth/components/molecules/email-field";
import { Form } from "@/components/ui/form";
import PasswordFields from "@/features/auth/components/molecules/password-field";
import TermField from "@/features/auth/components/molecules/term-field";

export default function RegisterForm() {
  const { form, onSubmit } = useRegisterForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex-1 md:max-w-md border rounded shadow-md p-4"
      >
        <UsernameField control={form.control} />
        <NameFields control={form.control} />
        <EmailField control={form.control} />
        <PasswordFields control={form.control} />
        <TermField control={form.control} />

        <div className="flex flex-1">
          <Button type="submit" className="flex flex-1">
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
}
