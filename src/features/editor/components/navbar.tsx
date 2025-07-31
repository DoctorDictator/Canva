"use client";

import { CiFileOn } from "react-icons/ci";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { useFilePicker } from "use-file-picker";
import { useMutationState } from "@tanstack/react-query";
import {
  ChevronDown,
  Download,
  Loader,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";

import { UserButton } from "@/features/auth/components/user-button";

import { ActiveTool, Editor } from "@/features/editor/types";
import { Logo } from "@/features/editor/components/logo";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  id: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({
  id,
  editor,
  activeTool,
  onChangeActiveTool,
}: NavbarProps) => {
  const data = useMutationState({
    filters: {
      mutationKey: ["project", { id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];

  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b border-blue-200 lg:pl-[34px] bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl">
      <Logo />
      <div className="w-full flex items-center gap-x-2 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="hover:bg-blue-100 text-blue-800 font-semibold transition-colors duration-300 rounded-xl shadow-md"
            >
              File
              <ChevronDown className="size-4 ml-2 text-blue-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-64 bg-white shadow-2xl rounded-2xl border border-blue-100 p-4"
          >
            <DropdownMenuItem
              onClick={() => openFilePicker()}
              className="flex items-center gap-x-3 hover:bg-blue-50 transition-colors duration-200 rounded-lg p-4 cursor-pointer"
            >
              <CiFileOn className="size-10 text-blue-700" />
              <div>
                <p className="font-bold text-blue-900">Open</p>
                <p className="text-sm text-blue-600">Open a JSON file</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-3 h-6 bg-blue-200" />
        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("select")}
            className={cn(
              activeTool === "select" && "bg-blue-200 text-blue-700",
              "hover:bg-blue-100 transition-colors duration-300 rounded-xl shadow-md"
            )}
          >
            <MousePointerClick className="size-6 text-blue-700" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canUndo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onUndo()}
            className="hover:bg-blue-100 transition-colors duration-300 rounded-xl shadow-md"
          >
            <Undo2 className="size-6 text-blue-700" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canRedo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onRedo()}
            className="hover:bg-blue-100 transition-colors duration-300 rounded-xl shadow-md"
          >
            <Redo2 className="size-6 text-blue-700" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-3 h-6 bg-blue-200" />
        {isPending && (
          <div className="flex items-center gap-x-2 bg-yellow-50 px-4 py-2 rounded-xl shadow-lg border border-yellow-200">
            <Loader className="size-5 animate-spin text-yellow-700" />
            <div className="text-sm text-yellow-800 font-semibold">
              Saving...
            </div>
          </div>
        )}
        {!isPending && isError && (
          <div className="flex items-center gap-x-2 bg-red-50 px-4 py-2 rounded-xl shadow-lg border border-red-200">
            <BsCloudSlash className="size-5 text-red-700" />
            <div className="text-sm text-red-800 font-semibold">
              Failed to save
            </div>
          </div>
        )}
        {!isPending && !isError && (
          <div className="flex items-center gap-x-2 bg-green-50 px-4 py-2 rounded-xl shadow-lg border border-green-200">
            <BsCloudCheck className="size-5 text-green-700" />
            <div className="text-sm text-green-800 font-semibold">Saved</div>
          </div>
        )}
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="hover:bg-blue-100 text-blue-800 font-semibold transition-colors duration-300 rounded-xl shadow-md"
              >
                Export
                <Download className="size-4 ml-3 text-blue-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-64 bg-white shadow-2xl rounded-2xl border border-blue-100 p-4"
            >
              <DropdownMenuItem
                className="flex items-center gap-x-3 hover:bg-blue-50 transition-colors duration-200 rounded-lg p-4 cursor-pointer"
                onClick={() => editor?.saveJson()}
              >
                <CiFileOn className="size-10 text-blue-700" />
                <div>
                  <p className="font-bold text-blue-900">JSON</p>
                  <p className="text-sm text-blue-600">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-3 hover:bg-blue-50 transition-colors duration-200 rounded-lg p-4 cursor-pointer"
                onClick={() => editor?.savePng()}
              >
                <CiFileOn className="size-10 text-blue-700" />
                <div>
                  <p className="font-bold text-blue-900">PNG</p>
                  <p className="text-sm text-blue-600">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-3 hover:bg-blue-50 transition-colors duration-200 rounded-lg p-4 cursor-pointer"
                onClick={() => editor?.saveJpg()}
              >
                <CiFileOn className="size-10 text-blue-700" />
                <div>
                  <p className="font-bold text-blue-900">JPG</p>
                  <p className="text-sm text-blue-600">Best for printing</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-3 hover:bg-blue-50 transition-colors duration-200 rounded-lg p-4 cursor-pointer"
                onClick={() => editor?.saveSvg()}
              >
                <CiFileOn className="size-10 text-blue-700" />
                <div>
                  <p className="font-bold text-blue-900">SVG</p>
                  <p className="text-sm text-blue-600">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
