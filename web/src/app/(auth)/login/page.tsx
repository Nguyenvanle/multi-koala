import { P } from "@/components/ui/typography";
import LoginForm from "@/features/auth/components/organisms/login-form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col justify-center px-4 items-center">
        <LoginForm />
        <div className="flex flex-row py-4 justify-center gap-2">
          <P>
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="font-bold">
              Sign up
            </Link>
          </P>
        </div>
      </div>
    </div>
  );
}
