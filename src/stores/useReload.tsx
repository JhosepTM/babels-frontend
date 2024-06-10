import { create } from "zustand";

interface ReloadStore {
  reload: boolean;
  toggle: (isExpanded: boolean) => void;
}

export const useReload = create<ReloadStore>((set) => ({
  reload: false,
  toggle: (isExpanded: boolean) =>
    set(() => ({
      reload: isExpanded,
    })),
}));