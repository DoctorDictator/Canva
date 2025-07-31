import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { useGenerateImage } from "@/features/ai/api/use-generate-image";

import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const mutation = useGenerateImage();

  const [value, setValue] = useState("");
  const featureDisabled = true;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (featureDisabled) return;

    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-gradient-to-b from-blue-50 to-indigo-50 relative border-r border-blue-200 z-[40] w-[360px] h-full flex flex-col shadow-xl",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <Alert className="flex items-start gap-x-2 bg-red-50 px-4 py-2 rounded-xl shadow-lg border border-red-200">
            <AlertCircle className="size-5 text-red-700 mt-0.5" />
            <div>
              <AlertTitle className="text-red-800 font-semibold">
                Feature Disabled
              </AlertTitle>
              <AlertDescription className="text-sm text-red-800">
                The API works correctly but every prompt costs some money, which
                is why I have disabled this feature.
              </AlertDescription>
            </div>
          </Alert>
          <form onSubmit={onSubmit}>
            <Textarea
              disabled={featureDisabled || mutation.isPending}
              placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
              cols={30}
              rows={10}
              required
              minLength={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mb-6 bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100 transition-colors duration-300 rounded-xl shadow-md"
            />
            <Button
              disabled={featureDisabled || mutation.isPending}
              type="submit"
              className="w-full bg-transparent hover:bg-blue-100 text-blue-800 font-semibold transition-colors duration-300 rounded-xl shadow-md"
            >
              {featureDisabled
                ? "Disabled"
                : mutation.isPending
                ? "Generating..."
                : "Generate"}
            </Button>
          </form>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
