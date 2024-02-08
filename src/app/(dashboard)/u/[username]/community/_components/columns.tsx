"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { ArrowUpDown } from "lucide-react";
import { UnblockButton } from "./unblock-button";

export type ColumnProps = {
  userId: string;
  imageUrl: string;
  username: string;
  createdAt: string;
};

export const columns: ColumnDef<ColumnProps>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <UserAvatar
          imageUrl={row.original.imageUrl}
          username={row.original.username}
          size={"default"}
        />
        <p>{row.original.username}</p>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Blocked On <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.createdAt}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
  },
];
