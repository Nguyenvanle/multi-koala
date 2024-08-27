import { H1 } from "@/components/ui/typography";
import RegisterForm from "@/features/auth/components/organisms/register-form";

export default function Register() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
