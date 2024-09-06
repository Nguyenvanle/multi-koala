"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { RegisterBody, RegisterBodyType } from "@/types/auth/schema/register";
import { DURATION } from "@/types/layout/toast";
import { registerService } from "@/features/auth/services/register";
import { showToast } from "@/lib/utils";
import { useEffect } from "react";

export default function useRegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
  });

  const onSubmit = async (values: RegisterBodyType) => {
    if (!values.terms) {
      showToast(
        "Error",
        "You must agree to the terms and conditions",
        "destructive"
      );
      return;
    }

    console.log(values);

    // Proceed with registration
    const { result, error } = await registerService.register(values);

    if (error) {
      showToast("Registration Error", error, "destructive");
    } else if (result) {
      showToast(
        "Registration Successful!",
        "Your account has been created successfully."
      );

      router.push("/verify");
    }
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);

  return { form, onSubmit };
}
