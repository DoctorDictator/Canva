import { ActiveTool, Editor, filters } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-gradient-to-b from-blue-50 to-indigo-50 relative border-r border-blue-200 z-[40] w-[360px] h-full flex flex-col shadow-xl",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Apply a filter to selected image"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left hover:bg-muted active:bg-muted/80 transition-colors duration-150"
              )}
              style={{
                filter: filter,
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => editor?.changeImageFilter(filter)}
            >
              <span className="text-lg font-medium">
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
