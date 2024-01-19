import { MessageSquare, Users } from "lucide-react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

type VariantToggleProps = {};

export const VariantToggle = ({}: VariantToggleProps) => {
  const { variant, changeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    changeVariant(isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT);
  };

  const label = isChat ? "Community" : "Go back to chat";

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
