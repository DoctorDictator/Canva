"use client";

import Link from "next/link";
import { Loader, TriangleAlert } from "lucide-react";
import { use } from "react"; // Import React.use

import { useGetProject } from "@/features/projects/api/use-get-project";

import { Editor } from "@/features/editor/components/editor";
import { Button } from "@/components/ui/button";

interface EditorProjectIdPageProps {
  params: Promise<{ projectId: string }>; // Type params as a Promise
}

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
  const { projectId } = use(params);
  const { data, isLoading, isError } = useGetProject(projectId);

  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to fetch project</p>
        <Button asChild variant="secondary">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
