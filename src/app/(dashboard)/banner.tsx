"use client";

import React from "react";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const onClick = () => {
    mutation.mutate(
      {
        name: "Untitled project",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative p-6 rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="relative z-10 flex flex-col items-center gap-y-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md p-4"
        >
          <Sparkles className="size-8 text-white fill-white animate-pulse" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white bg-clip-text">
          New Component
        </h2>
        <p className="text-sm text-white/80 max-w-xs text-center">
          A modern, animated component for your application. Customize it to fit
          your needs.
        </p>
        <Button
          disabled={mutation.isPending}
          onClick={onClick}
          variant="secondary"
          className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};
