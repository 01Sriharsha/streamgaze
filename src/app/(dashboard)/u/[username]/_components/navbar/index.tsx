import React from "react";
import { Logo } from "./logo";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-49 bg-[#252731] px-3 lg:pg-4 flex justify-between items-center gap-2 shadow-sm">
      <Logo />
      <Actions />
    </nav>
  );
};
