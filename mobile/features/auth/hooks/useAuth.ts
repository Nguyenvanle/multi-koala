import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { toast } from "@/components/ui/use-toast";
import { LoginBody, LoginBodyType } from "../types/login";
import { loginService } from "../services/login";
import { DURATION } from "@/types/layout/toast";

export const useLoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginBodyType) => {
    const { result, error } = await loginService(values);

    if (error) {
      toast({
        title: "Login Failed",
        description: error,
        duration: DURATION,
      });
    } else if (result) {
      toast({
        title: "Login Successful!",
        description: "Welcome back",
        duration: DURATION,
      });
      router.push("/"); // Điều hướng đến trang chủ
    }
  };

  return { form, onSubmit };
};
