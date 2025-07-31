import { ChevronsRight } from "lucide-react";

interface ToolSidebarCloseProps {
  onClick: () => void;
}

export const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute -left-[1.80rem] h-[70px] bg-white top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-l-xl px-1 pl-2 border-l border-y group"
    >
      <ChevronsRight className="size-4 text-black group-hover:opacity-75 transition" />
    </button>
  );
};
