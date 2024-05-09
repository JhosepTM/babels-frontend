import { useSidebarStore } from "@/stores/useSidebarStore";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export const SidebarItem = ({
  icon,
  text,
  active = false,
  alert = false,
}: SidebarItemProps) => {
  const { isExpanded } = useSidebarStore();

  return (
    <li
      className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      ${
        active
          ? "bg-dark-tremor-background-muted text-white"
          : "hover:bg-gray-100 text-gray-600"
      }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all font-semibold ${
          isExpanded ? "w-53 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute w-2 h-2 rounded bg-gray-400 ${
            isExpanded
              ? "2xl:right-2 xl:right-0 lg:right-0 md:right-0"
              : "top-2 right-2"
          }`}
        ></div>
      )}

      {!isExpanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
          bg-gray-100 text-gray-800 text-sm font-semibold
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
};
