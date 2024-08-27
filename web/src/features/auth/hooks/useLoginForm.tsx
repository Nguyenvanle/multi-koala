"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {} from "@/types/auth/schema/register";
import { LoginBody, LoginBodyType } from "@/types/auth/schema/login";
import { DURATION } from "@/types/layout/toast";

export default function useLoginForm() {
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginBodyType) => {
    console.log(values);

    // Proceed with registration
    toast({
      title: "Login Successful!",
      description: "Welcome back",
      duration: DURATION,
    });

    router.push("/dashboard");
  };

  return { form, onSubmit };
}
