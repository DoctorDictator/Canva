"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  CopyIcon,
  FileIcon,
  Loader,
  MoreHorizontal,
  Search,
  Trash,
} from "lucide-react";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";

import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";

export const ProjectsSection = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this project."
  );
  const duplicateMutation = useDuplicateProject();
  const removeMutation = useDeleteProject();
  const router = useRouter();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  const onDelete = async (id: string) => {
    const ok = await confirm();

    if (ok) {
      removeMutation.mutate({ id });
    }
  };

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();

  if (status === "pending") {
    return (
      <div className="space-y-4 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-200">
        <h3 className="font-bold text-xl text-gray-900">Recent projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Loader className="size-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-200">
        <h3 className="font-bold text-xl text-gray-900">Recent projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <AlertTriangle className="size-8 text-gray-500" />
          <p className="text-gray-500 text-sm">Failed to load projects</p>
        </div>
      </div>
    );
  }

  const allProjectsArePro = data?.pages.every((page) =>
    page.data.every((project) => project.isPro === true)
  );
  if (!data?.pages.length || !data?.pages[0].data.length || allProjectsArePro) {
    return (
      <div className="space-y-4 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-200">
        <h3 className="font-bold text-xl text-gray-900">Recent projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Search className="size-8 text-gray-500" />
          <p className="text-gray-500 text-sm">No projects found</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-4 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-200">
        <ConfirmDialog />
        <h3 className="font-bold text-xl text-gray-900">Recent projects</h3>
        <Table className="bg-white rounded-lg overflow-hidden">
          <TableBody>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data
                  .filter((project) => project.isPro === null)
                  .map((project) => (
                    <TableRow
                      key={project.id}
                      className="hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-0"
                    >
                      <TableCell
                        onClick={() => router.push(`/editor/${project.id}`)}
                        className="font-medium flex items-center gap-x-3 cursor-pointer text-gray-900"
                      >
                        <FileIcon className="size-6 text-gray-500" />
                        {project.name}
                      </TableCell>
                      <TableCell
                        onClick={() => router.push(`/editor/${project.id}`)}
                        className="hidden md:table-cell cursor-pointer text-gray-600"
                      >
                        {project.width} x {project.height} px
                      </TableCell>
                      <TableCell
                        onClick={() => router.push(`/editor/${project.id}`)}
                        className="hidden md:table-cell cursor-pointer text-gray-600"
                      >
                        {formatDistanceToNow(project.updatedAt, {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell className="flex items-center justify-end">
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              disabled={false}
                              size="icon"
                              variant="ghost"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            >
                              <MoreHorizontal className="size-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-60 bg-white border border-gray-200 shadow-xl"
                          >
                            <DropdownMenuItem
                              className="h-10 cursor-pointer text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                              disabled={duplicateMutation.isPending}
                              onClick={() => onCopy(project.id)}
                            >
                              <CopyIcon className="size-4 mr-2 text-gray-500" />
                              Make a copy
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-10 cursor-pointer text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                              disabled={removeMutation.isPending}
                              onClick={() => onDelete(project.id)}
                            >
                              <Trash className="size-4 mr-2 text-gray-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        {hasNextPage && (
          <div className="w-full flex items-center justify-center pt-4">
            <Button
              variant="ghost"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    );
  }
};
