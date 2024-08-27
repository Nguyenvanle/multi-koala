import { H1 } from "@/components/ui/typography";
import LoginForm from "@/features/auth/components/organisms/login-form";

export default function Login() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
