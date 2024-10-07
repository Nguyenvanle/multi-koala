import RegisterForm from "@/features/auth/components/organisms/register-form";

export default function Register() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex justify-center flex-col p-4 xl:p-6 items-center">
        <RegisterForm />
      </div>
    </div>
  );
}
