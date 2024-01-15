import React, { ReactNode, Suspense } from "react";
import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/services/auth-service";
import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Container } from "./_components/sidebar/container";

type CreatorLayoutProps = {
  params: {
    username: string;
  };
  children: ReactNode;
};
export default async function CreatorLayout({
  children,
  params,
}: CreatorLayoutProps) {
  const { username } = params;
  const self = await getSelfByUsername(username);

  if (!self) {
    return redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
}
