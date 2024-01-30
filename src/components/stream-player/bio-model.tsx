"use client";

import { ElementRef, FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/actions/user-action";

type BioModalProps = {
  initialValue: string | null;
};

export const BioModal = ({ initialValue }: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value || value.trim().length === 0) return;
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("Bio updated!");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Textarea
            placeholder="User bio"
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between items-center">
            <DialogClose asChild>
              <Button ref={closeRef} variant={"ghost"} type="button" size="sm">
                Close
              </Button>
            </DialogClose>
            <Button
              variant={"primary"}
              type="submit"
              size="sm"
              disabled={isPending}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
