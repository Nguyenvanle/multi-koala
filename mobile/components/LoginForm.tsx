import React from "react";
import { useLoginForm } from "@/features/auth/hooks/useAuth";

const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("username")} placeholder="Username" />
      {form.formState.errors.username && (
        <p>{form.formState.errors.username.message}</p>
      )}

      <input
        type="password"
        {...form.register("password")}
        placeholder="Password"
      />
      {form.formState.errors.password && (
        <p>{form.formState.errors.password.message}</p>
      )}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
