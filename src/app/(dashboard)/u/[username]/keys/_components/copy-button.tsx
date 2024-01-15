"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

type CopyButtonProps = {
  value: string;
};

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIscopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;

    setIscopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIscopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button size="sm" variant="ghost" onClick={handleCopy} disabled={isCopied}>
      <Icon className="h-4 w-4" />
    </Button>
  );
};
