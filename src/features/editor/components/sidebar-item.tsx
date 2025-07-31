import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full h-full aspect-video p-3 py-4 flex flex-col",
        isActive
          ? "bg-blue-200 text-blue-700"
          : "hover:bg-blue-100 text-blue-800",
        "transition-colors duration-300 rounded-xl shadow-md"
      )}
    >
      <Icon className="size-6 text-blue-700 stroke-2 shrink-0" />
      <span className="mt-2 text-sm font-medium">{label}</span>
    </Button>
  );
};
