import React, { ReactNode } from "react";
import Navbar from "./_components/navbar";

export default function BrowseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
}
