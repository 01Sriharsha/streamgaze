import { Maximize, Minimize } from "lucide-react";
import { Hint } from "@/components/hint";

type FullScreenControlProps = {
  isFullScreen: boolean;
  onToggle: () => void;
};

export const FullScreenControl = ({
  isFullScreen,
  onToggle,
}: FullScreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exit fullscreen" : "Enter fullscreen";

  return (
    <div className="flex justify-center items-center gap-4">
      <Hint label={label} asChild>
        <button
          className="p-1.5 text-white rounded-lg hover:bg-white/10"
          onClick={onToggle}
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
