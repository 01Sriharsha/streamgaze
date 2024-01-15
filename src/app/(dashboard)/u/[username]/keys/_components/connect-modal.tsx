"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { createIngress } from "@/actions/ingress-action";

type ConnectModalProps = {};

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = ({}: ConnectModalProps) => {
  const [ingressType, setIngressType] = useState<IngressType>("");

  const [isPending, startTransition] = useTransition();

  const closeRef = useRef<ElementRef<"button">>(null);

  const handleGenerate = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then((res) => {
          console.log(res);
          toast.success("Ingress created");
          closeRef.current?.click(); //close the dialog
        })
        .catch((err) => {
          toast.error("Something went wrong! Failed to create an ingress");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"primary"}>Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>

        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={"Ingress Type"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert>
          <AlertTriangle color="yellow" className="h-4 w-4" />
          <AlertTitle className="text-yellow-300">Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current
            connection
          </AlertDescription>
        </Alert>

        <div className="flex justify-between items-center">
          <DialogClose ref={closeRef} asChild>
            <Button variant={"ghost"}>Close</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            variant={"primary"}
            onClick={handleGenerate}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
