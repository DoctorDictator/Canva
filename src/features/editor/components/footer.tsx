import { Minimize, ZoomIn, ZoomOut } from "lucide-react";

import { Editor } from "@/features/editor/types";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

interface FooterProps {
  editor: Editor | undefined;
}

export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="h-[52px] border-t border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse shadow-xl">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="ghost"
          className="h-full hover:bg-blue-100 transition-colors duration-300 rounded-xl shadow-md"
        >
          <Minimize className="size-6 text-blue-700" />
        </Button>
      </Hint>
      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="ghost"
          className="h-full hover:bg-blue-100 transition-colors duration-300 rounded-xl shadow-md"
        >
          <ZoomIn className="size-6 text-blue-700" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="ghost"
          className="h-full hover:bg-blue-100 transition-colors duration-300 rounded-xl shadow-md"
        >
          <ZoomOut className="size-6 text-blue-700" />
        </Button>
      </Hint>
    </footer>
  );
};
