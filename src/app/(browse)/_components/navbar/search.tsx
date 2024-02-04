"use client";

import React, { FormEvent, useState } from "react";
import qs from "query-string";
import { SearchIcon, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();

  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="relative w-full md:w-[400px] flex items-center"
      >
        <Input
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        {value && (
          <X
            className="absolute right-14 h-4 w-4 text-muted-foreground cursor-pointer"
            onClick={() => setValue("")}
          />
        )}
        <Button
          type="submit"
          size={"sm"}
          variant={"ghost"}
          className="hover:bg-transparent"
        >
          <SearchIcon className="h-5 w-5 text-muted-foreground hover:text-white z-49" />
        </Button>
      </form>
    </div>
  );
};
