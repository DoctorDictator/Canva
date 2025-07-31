import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-gradient-to-b from-blue-50 to-indigo-50 relative border-r border-blue-200 z-[40] w-[360px] h-full flex flex-col shadow-xl",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to your canvas" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b border-blue-200">
          <Button
            className="w-full hover:bg-blue-100 text-blue-800 font-semibold transition-colors duration-300 rounded-xl shadow-md"
            onClick={() => editor?.addText("Textbox")}
          >
            Add a textbox
          </Button>
          <Button
            className="w-full h-16  hover:bg-blue-100 text-blue-800 font-semibold transition-colors duration-300 rounded-xl shadow-md"
            variant="ghost"
            size="lg"
            onClick={() =>
              editor?.addText("Heading", {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className="text-3xl font-bold text-blue-900">
              Add a heading
            </span>
          </Button>
          <Button
            className="w-full h-16 hover:bg-blue-100 text-blue-800 font-semibold transition-colors duration-300 rounded-xl shadow-md"
            variant="ghost"
            size="lg"
            onClick={() =>
              editor?.addText("Subheading", {
                fontSize: 44,
                fontWeight: 600,
              })
            }
          >
            <span className="text-xl font-semibold text-blue-900">
              Add a subheading
            </span>
          </Button>
          <Button
            className="w-full h-16 hover:bg-blue-100 text-blue-800 font-semibold transition-colors duration-300 rounded-xl shadow-md"
            variant="ghost"
            size="lg"
            onClick={() =>
              editor?.addText("Paragraph", {
                fontSize: 32,
              })
            }
          >
            <span className="text-blue-900 font-medium">Paragraph</span>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
