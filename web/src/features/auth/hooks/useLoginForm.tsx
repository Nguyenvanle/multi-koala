"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { LoginBody, LoginBodyType } from "@/types/auth/schema/login";
import { DURATION } from "@/types/layout/toast";
import { handlerAuth } from "@/features/auth/services/handler-auth";
import { LoginResType } from "@/features/auth/types/login";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { loginService } from "@/features/auth/services/login";

export default function useLoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginBodyType) => {
    try {
      const {result: response} = await loginService.nextLogin(values);

      if (response?.code === 200 && response.result) {
        login(response.result.user);

        toast({
          title: "Login Successful!",
          description: "Welcome back",
          duration: DURATION,
        });
        router.push("/dashboard");
      } else {
        handlerAuth({
          code: response?.code,
          error: response?.message,
          setError: form.setError,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        duration: DURATION,
      });
    }
  };

  return { form, onSubmit };
}