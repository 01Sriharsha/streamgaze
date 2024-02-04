import { User } from "@prisma/client";

type SearchResultCardProps = {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    user: User;
  };
};

export const SearchResultCard = ({
  data: { id, isLive, name: streamName, thumbnailUrl, user },
}: SearchResultCardProps) => {
  return <div>SearchResultCard</div>;
};
