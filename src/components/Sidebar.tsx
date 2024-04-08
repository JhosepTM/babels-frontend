import { useSidebarStore } from "@/stores/useSidebarStore";
import { ChevronFirst, ChevronLast } from "lucide-react";

interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar = ({ children = null }: SidebarProps) => {
  const { isExpanded, toggle } = useSidebarStore();

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white dark:bg-dark-tremor-background-subtle border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              isExpanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => toggle(!isExpanded)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {isExpanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>
      </nav>
    </aside>
  );
};
