"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterBody, RegisterBodyType } from "@/types/auth/schema/register";
import { registerService } from "@/features/auth/services/register";
import { showToast } from "@/lib/utils";
import { useEffect } from "react";
import { handlerAuth } from "@/features/auth/services/handler-auth";

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

    
    console.log('Verify di may')
    // // Proceed with registration
    // const { result, error, code } = await registerService.register(values);

    // if (error) {
    //   // Sử dụng handlerAuth để xử lý lỗi từ API
    //   handlerAuth({
    //     code,
    //     error,
    //     setError: form.setError, // Thiết lập hàm setError từ react-hook-form
    //   });
    // } else if (result) {
    //   showToast(
    //     "Registration Successful!",
    //     "Your account has been created successfully."
    //   );

    //   router.push(`/verify?mailto=${form.getValues(`email`)}`);
    // }
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);

  return { form, onSubmit };
}
