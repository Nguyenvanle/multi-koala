import LoginForm from "@/features/auth/components/organisms/login-form";

export default function Login() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col justify-center px-4 items-center">
        <LoginForm />
      </div>
    </div>
  );
}
