import { Sidebar } from "../components/Sidebar";
import { SidebarItem } from "../components/SidebarItem";
import { useSidebarStore } from "../stores/useSidebarStore";
import { BarChartPage } from "./BarChartPage";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
  CircleDollarSign,
} from "lucide-react";
import { RevenueChartPage } from "./RevenueChartPage";
import { useState } from "react";

interface SidebarItem {
  value: string;
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
  active?: boolean;
  child: React.ReactNode;
}

const sidebarItems: SidebarItem[][] = [
  [
    {
      value: "bookings",
      icon: <BarChart3 size={20} />,
      text: "Bookings",
      alert: false,
      child: <BarChartPage />,
    },
    {
      value: "revenue",
      icon: <CircleDollarSign size={20} />,
      text: "Revenue",
      alert: false,
      child: <RevenueChartPage />,
    },
  ],
  [
    {
      value: "dashboard",
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      alert: true,
      child: <h1>DashBoard</h1>,
    },
    {
      value: "analytics",
      icon: <BarChart3 size={20} />,
      text: "Analytics",
      alert: false,
      child: <h1>Analytics</h1>,
    },
    {
      value: "customers",
      icon: <UserCircle size={20} />,
      text: "Customers",
      alert: false,
      child: <h1>Customers</h1>,
    },
    {
      value: "inventory",
      icon: <Boxes size={20} />,
      text: "Inventory",
      alert: false,
      child: <h1>Inventory</h1>,
    },
    {
      value: "orders",
      icon: <Package size={20} />,
      text: "Orders",
      alert: false,
      child: <h1>Orders</h1>,
    },
    {
      value: "billings",
      icon: <Receipt size={20} />,
      text: "Billings",
      alert: false,
      child: <h1>Billings</h1>,
    },
    {
      value: "settings",
      icon: <Settings size={20} />,
      text: "Settings",
      alert: false,
      child: <h1>Settings</h1>,
    },
    {
      value: "help",
      icon: <LifeBuoy size={20} />,
      text: "Help",
      alert: false,
      child: <h1>Help</h1>,
    },
  ],
];

interface GraphicsBarProps {
  itemActive?: string;
}

export const GraphicsBar: React.FC<GraphicsBarProps> = ({
  itemActive = "bookings",
}) => {
  const searchChild = (value: string) => {
    const item = sidebarItems.flat().find((item) => item.value === value);
    if (item) {
      return item.child;
    }
    return <h1>Not Found</h1>;
  };

  const [selectedItem, setSelectedItem] = useState<string>(itemActive);
  const [child, setChild] = useState<React.ReactNode>(searchChild(itemActive));
  const { isExpanded } = useSidebarStore();

  return (
    <div className="flex">
      {/* center -> flex 2xl:items-center */}
      <div className={`z-50 ${isExpanded ? "w-52" : "w-20"}`}>
        <Sidebar>
          {sidebarItems.map((subArray, index) => (
            <>
              {subArray.map((item) => (
                <div
                  onClick={() => {
                    setSelectedItem(item.value);
                    setChild(item.child);
                  }}
                >
                  <SidebarItem
                    key={item.value}
                    icon={item.icon}
                    text={item.text}
                    alert={item.alert}
                    active={item.value === selectedItem}
                  />
                </div>
              ))}
              {index < sidebarItems.length - 1 && <hr className="my-3" />}
            </>
          ))}
        </Sidebar>
      </div>
      {/* center-> w-full 2xl:h-auto h-screen z-0 */}
      <div className="w-full h-screen bg-slate-100">
        <ScrollArea className="w-full h-full">{child}</ScrollArea>
      </div>
    </div>
  );
};
