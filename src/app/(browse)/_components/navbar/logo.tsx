import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const Logo = () => {
  return (
    <Link
      href={"/"}
      className={cn(
        "flex justify-center items-center ",
        font.className
      )}
    >
      <div className="flex items-center justify-center gap-1">
        <Image
          src="/spooky.svg"
          alt="logo"
          height={30}
          width={30}
          className="object-cover bg-white rounded-full my-4"
        />
        <p className="hidden md:block">Twitch</p>
      </div>
    </Link>
  );
};
