"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { LoginBody, LoginBodyType } from "@/types/auth/schema/login";
import { DURATION } from "@/types/layout/toast";
import { handlerAuth } from "@/features/auth/services/handler-auth";

export default function useLoginForm() {
  const router = useRouter();
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

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast({
          title: "Login Successful!",
          description: "Welcome back",
          duration: DURATION,
        });
        router.push("/dashboard");
      } else {
        // Sử dụng handlerAuth để xử lý lỗi từ API
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