import { ReactNode, Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Conatiner } from "./_components/sidebar/container";

export default function BrowseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Conatiner>{children}</Conatiner>
      </div>
    </>
  );
}
