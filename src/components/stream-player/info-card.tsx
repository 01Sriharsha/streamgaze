"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { InfoModal } from "./info-modal";

type InfoCardProps = {
  hostIdentity: string;
  viewerIdentity: string;
  streamName: string;
  thumbnailUrl: string | null;
};

export const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  streamName,
  thumbnailUrl,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) {
    return null;
  }
  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your Stream Info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </>
          <InfoModal
            initialName={streamName}
            initalThumbnailurl={thumbnailUrl}
          />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
          <p className="text-sm font-semibold">{streamName}</p>
        </div>
        <div className="p-4 lg:p-6 space-y-4">
          <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={streamName}
              width={200}
              height={300}
              quality={50}
              className="object-cover w-[200px] rounded-md overflow-hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};
