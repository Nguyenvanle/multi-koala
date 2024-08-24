// components/header/AuthButtons.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AuthButtons: React.FC = () => (
  <div className="space-x-2">
    <Link href={"/login"}>
      <Button>Login</Button>
    </Link>
    <Link href={"/register"}>
      <Button>Sign up</Button>
    </Link>
  </div>
);

export default AuthButtons;
