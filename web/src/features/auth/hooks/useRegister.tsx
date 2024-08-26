"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { RegisterBody, RegisterBodyType } from "@/types/auth/schema/register";

export default function useRegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
  });

  const onSubmit = (values: RegisterBodyType) => {
    if (!values.terms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    console.log(values);

    // Proceed with registration
    toast({
      title: "Registration Successful!",
      description: "Your account has been created successfully.",
    });

    router.push("/verify");
  };

  return { form, onSubmit };
}
