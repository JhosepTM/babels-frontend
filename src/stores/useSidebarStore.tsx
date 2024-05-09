import { create } from "zustand";

interface SidebarStore {
  isExpanded: boolean;
  toggle: (isExpanded: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isExpanded: false,
  toggle: (isExpanded: boolean) =>
    set(() => ({
      isExpanded: isExpanded,
    })),
}));
