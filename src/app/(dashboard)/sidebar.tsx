import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex fixed flex-col w-auto left-0 shrink-0 h-full bg-gradient-to-b  from-indigo-600 via-blue-500 to-cyan-400 shadow-2xl">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
        <SidebarRoutes />
      </div>
    </aside>
  );
};
