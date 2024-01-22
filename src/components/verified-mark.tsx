import { Check } from "lucide-react";

type VerifiedMarkProps = {};

export const VerifiedMark = ({}: VerifiedMarkProps) => {
  return (
    <div className="h-4 w-4 rounded-full bg-blue-600 text-white p-0.5">
      <Check className="h-3 w-3 stroke-[4px]" />
    </div>
  );
};
