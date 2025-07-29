import { UserButton } from "@/features/auth/components/user-button";

export const Navbar = () => {
  return (
    <nav className="w-auto flex items-center p-4 h-[68px] bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 backdrop-blur-xl border-b border-white/10 shadow-lg sticky top-0 z-50">
      <div className="ml-auto flex items-center gap-4">
        <UserButton />
      </div>
    </nav>
  );
};
