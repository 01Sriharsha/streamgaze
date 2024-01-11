import React, { ReactNode } from "react";
import { Logo } from "./_components/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Logo />
      {children}
    </div>
  );
}
