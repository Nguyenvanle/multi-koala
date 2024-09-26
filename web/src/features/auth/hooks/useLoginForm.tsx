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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data: LoginResType = await response.json();

      if (response.ok) {
        // Lưu thông tin user vào context
        login(data.result.user);

        toast({
          title: "Login Successful!",
          description: "Welcome back",
          duration: DURATION,
        });
        router.push("/dashboard");
      } else {
        handlerAuth({
          code: data.code,
          error: data.message,
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