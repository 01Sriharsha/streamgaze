import React from "react";
import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-20 z-49 bg-[#252731] px-3 lg:pg-4 flex justify-between items-center gap-2 shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
}
