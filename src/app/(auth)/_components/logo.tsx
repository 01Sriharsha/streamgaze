import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export function Logo() {
  return (
    <div className={cn("flex justify-center items-center", font.className)}>
      <Image
        src="/spooky.svg"
        alt="logo"
        height={60}
        width={60}
        className="object-cover bg-white rounded-full my-4"
      />
    </div>
  );
}
