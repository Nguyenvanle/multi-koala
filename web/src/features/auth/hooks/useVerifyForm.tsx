"use client";

import { toast } from "@/components/ui/use-toast";
import { VerifyBody, VerifyBodyType } from "@/types/auth/schema/verify";
import { DURATION } from "@/types/layout/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function useVerifyForm() {
  const router = useRouter();

  const form = useForm<VerifyBodyType>({
    resolver: zodResolver(VerifyBody),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(values: VerifyBodyType) {
    try {
      // Giả lập yêu cầu xác minh OTP
      const response = { ok: true, message: 404 };

      if (response.ok) {
        toast({
          title: "Verification Successful",
          description: "Your OTP has been verified successfully.",
          duration: DURATION,
        });
        // Thực hiện hành động tiếp theo, ví dụ: chuyển hướng hoặc cập nhật trạng thái

        router.push("/dashboard");
      } else {
        toast({
          title: "Verification Failed",
          description: response.message || "The OTP you entered is incorrect.",
          duration: DURATION,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An Error Occurred",
        description: "There was an issue verifying your OTP. Please try again.",
        duration: DURATION,
        variant: "destructive",
      });
    }
  }

  return { form, onSubmit };
}
