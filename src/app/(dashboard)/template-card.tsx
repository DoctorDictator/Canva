import Image from "next/image";
import { Crown } from "lucide-react";

import { cn } from "@/lib/utils";

interface TemplateCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
  isPro: boolean | null;
}

export const TemplateCard = ({
  imageSrc,
  title,
  onClick,
  disabled,
  description,
  height,
  width,
  isPro,
}: TemplateCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group text-left transition rounded-lg border p-4 flex flex-col gap-y-2",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:bg-muted/50"
      )}
    >
      <div
        style={{ aspectRatio: `${width}/${height}` }}
        className="relative rounded-md overflow-hidden border border-muted"
      >
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="object-cover transition group-hover:scale-102"
        />
        {isPro && (
          <div className="absolute top-1 right-1 h-8 w-8 flex items-center justify-center bg-muted rounded-full">
            <Crown className="size-4 fill-yellow-400 text-yellow-400" />
          </div>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 bg-black/40 flex items-center justify-center rounded-md">
          <p className="text-white text-sm font-medium">Use Template</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};
