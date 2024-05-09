import { ComponentType } from "react";

interface Component {
  className?: string;
}

export interface ToolItem {
  title: string;
  img: ComponentType<Component>;
  onClick: () => void;
}
