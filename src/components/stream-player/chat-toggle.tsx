import { ArrowRightFromLine, MessageSquareText } from "lucide-react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";

type ChatToggleProps = {};

export const ChatToggle = ({}: ChatToggleProps) => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);

  let Icon = collapsed ? MessageSquareText : ArrowRightFromLine;

  const label = collapsed ? "View Chat" : "Collapse";

  const onToggle = () => (collapsed ? onExpand() : onCollapse());

  return (
    <Hint label={label} side="left">
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className={cn(
          "h-auto p-2 hover:bg-white/10 text-primary bg-transparent"
        )}
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
