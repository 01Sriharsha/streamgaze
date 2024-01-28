"use client";

import {
  ChangeEvent,
  ElementRef,
  FormEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
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
import { UploadDropzone } from "@/lib/uploadthing";

import { removeThumbnail, updateStream } from "@/actions/stream-action";
import { Hint } from "../hint";

type InfoModalProps = {
  initialName: string;
  initalThumbnailurl: string | null;
};

export const InfoModal = ({
  initialName,
  initalThumbnailurl,
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const [name, setName] = useState(initialName);
  const [thumbnailurl, setThumbnailurl] = useState(initalThumbnailurl);

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

  const handleRemoveThumbnail = () => {
    startTransition(() => {
      removeThumbnail()
        .then(() => {
          toast.success("Thumbnail removed!");
          setThumbnailurl("");
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
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailurl ? (
              <div className="relative rounded-xl border outline-dashed outline-muted p-1">
                <Image
                  src={thumbnailurl}
                  alt={name}
                  width={200}
                  height={300}
                  className="object-cover mx-auto rounded-md overflow-hidden"
                />
                <Button
                  size={"sm"}
                  disabled={isPending}
                  className="absolute top-0 right-0"
                  onClick={handleRemoveThumbnail}
                >
                  <Hint label="Remove Thumbnail" side="left">
                    <Trash2 className="h-5 w-5" />
                  </Hint>
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailurl(res?.[0]?.url);
                    closeRef.current?.click();
                    router.refresh();
                  }}
                />
              </div>
            )}
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
