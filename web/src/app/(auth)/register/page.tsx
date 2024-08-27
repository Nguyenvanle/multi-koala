import { P } from "@/components/ui/typography";
import RegisterForm from "@/features/auth/components/organisms/register-form";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex justify-center flex-col px-4 items-center">
        <RegisterForm />
        <div className="flex flex-row py-4 justify-center gap-2">
          <P>
            You already have an account?{" "}
            <Link href={"/login"} className="font-bold">
              Login
            </Link>
          </P>
        </div>
      </div>
    </div>
  );
}
