import { ReactNode } from "react";

export interface ToolItem {
  title: string;
  img: ReactNode;
  onClick: () => void;
}
