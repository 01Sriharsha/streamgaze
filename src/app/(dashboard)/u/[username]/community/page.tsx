import { format } from "date-fns";
import { getBlockedUsers } from "@/services/block-service";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

type CommunitypageProps = {
  params: {
    username: string;
  };
};

export default async function CommunityPage({
  params: { username },
}: CommunitypageProps) {
  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((block) => {
    return {
      ...block,
      userId: block.blocked.id,
      imageUrl: block.blocked.imageUrl,
      username: block.blocked.username,
      createdAt: format(block.createdAt, "dd/MM/yyyy"),
    };
  });

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
}
