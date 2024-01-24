"use client";

import {
  ChangeEvent,
  ElementRef,
  FormEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStream } from "@/actions/stream-action";

type InfoModalProps = {
  initialName: string;
  initalThumbnailurl: string | null;
};

export const InfoModal = ({
  initialName,
  initalThumbnailurl,
}: InfoModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [name, setName] = useState(initialName);

  const [isPending, startTransition] = useTransition();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success("Stream updated!");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className="ml-auto" size={"sm"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form className="space-y-14" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="stream name"
              value={name}
              disabled={isPending}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between">
            <DialogClose>
              <Button
                ref={closeRef}
                size={"sm"}
                variant={"ghost"}
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              size={"sm"}
              variant={"primary"}
              type="submit"
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
