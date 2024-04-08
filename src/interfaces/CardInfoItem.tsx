import { ComponentType } from "react";

interface Component {
  className?: string;
}

export interface CardInfoItem {
  title: string;
  mainContent: string;
  secondaryContent: string;
  icon: ComponentType<Component>;
}
