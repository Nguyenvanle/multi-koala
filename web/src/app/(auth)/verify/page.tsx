"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { P } from "@/components/ui/typography";
import OTPField from "@/features/auth/components/molecules/otp-field";
import { useSearchParams } from "next/navigation";

export default function Verify() {
  const searchParams = useSearchParams();
  const email = searchParams.get("mailto");

  return (
    <div className="flex flex-1 justify-center px-4">
      <Card className="flex flex-1 flex-col  max-w-md justify-center text-center">
        <CardHeader>
          <CardTitle>Verify Your Account</CardTitle>
          <CardDescription>
            We are sending a OTP to validate your email, Hang on!
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <OTPField />
        </CardContent>
        <CardFooter>
          <P>
            A email has been sent to{" "}
            <span className="font-semibold">{email}</span>
          </P>
        </CardFooter>
      </Card>
    </div>
  );
}
