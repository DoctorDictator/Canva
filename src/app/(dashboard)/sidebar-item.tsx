import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        className={cn(
          "flex items-center mx-4 my-2 p-4 rounded-2xl bg-white/5 hover:bg-white/20 transition-all duration-300 cursor-pointer relative overflow-hidden group",
          isActive && "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon className="size-5 mr-3 stroke-2 text-white group-hover:text-purple-200 transition-colors" />
        <span className="text-sm font-semibold text-white group-hover:text-purple-100">
          {label}
        </span>
        {isActive && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1"
            layoutId="sidebar-active-indicator"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};
