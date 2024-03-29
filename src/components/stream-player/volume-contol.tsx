import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Hint } from "@/components/hint";

type VolumeControlProps = {
  value: number;
  onToggle: () => void;
  onChange: (value: number) => void;
};

export const VolumeControl = ({
  value,
  onChange,
  onToggle,
}: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1;

  const label = isMuted ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
          onClick={onToggle}
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
};
