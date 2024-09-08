"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {} from "@/types/auth/schema/register";
import { LoginBody, LoginBodyType } from "@/types/auth/schema/login";
import { DURATION } from "@/types/layout/toast";
import { loginService } from "@/features/auth/services/login";
import { handlerAuth } from "@/features/auth/services/handler-auth";

export default function useLoginForm() {
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginBodyType) => {
    // Proceed with registration
    const { result, error, code } = await loginService.login(values);

    if (error) {
      // Sử dụng handlerAuth để xử lý lỗi từ API
      handlerAuth({
        code,
        error,
        setError: form.setError, // Thiết lập hàm setError từ react-hook-form
      });
    } else if (result) {
      // Proceed with registration
      toast({
        title: "Login Successful!",
        description: "Welcome back",
        duration: DURATION,
      });

      router.push("/dashboard");
    }
  };

  return { form, onSubmit };
}
