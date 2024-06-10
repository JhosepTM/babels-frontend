import { Sidebar } from "../components/Sidebar";
import { SidebarItem } from "../components/SidebarItem";
import { useSidebarStore } from "../stores/useSidebarStore";
import { ReservationChartPage } from "./ReservationChartPage";
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
  TicketPercent,
  CalendarRange,
  TrendingUp,
  LineChart,
  PieChart,
  DollarSign,
  Download,
  BookDown,
} from "lucide-react";
import { RevenueChartPage } from "./RevenueChartPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OccupancyRatePage } from "./OccupancyRatePage";
import { AvailableDailyRatePage } from "./AvailableDailyRatePage";
import { RevenueAvailablePage } from "./RevenueAvailableRage";
import { GrossOperatingPage } from "./GrossOperatingPage";
import { RevenuePage } from "./RevenuePage";
import { ExpensePage } from "./ExpensePage";
import { ExportPage } from "./ExportPage";

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
      value: "occ",
      icon: <TicketPercent size={20} />,
      text: "OCC",
      alert: false,
      child: <OccupancyRatePage />,
    },
    {
      value: "adr",
      icon: <CalendarRange size={20} />,
      text: "ADR",
      alert: false,
      child: <AvailableDailyRatePage />,
    },
    {
      value: "revpar-trevpar",
      icon: <TrendingUp size={20} />,
      text: "RevPAR",
      alert: false,
      child: <RevenueAvailablePage />,
    },
    {
      value: "goppar",
      icon: <PieChart size={20} />,
      text: "GopPAR",
      alert: false,
      child: <GrossOperatingPage />,
    },
    {
      value: "bookings",
      icon: <BarChart3 size={20} />,
      text: "Reservas",
      alert: false,
      child: <ReservationChartPage />,
    },
    {
      value: "revenue",
      icon: <CircleDollarSign size={20} />,
      text: "Reservas",
      alert: false,
      child: <RevenueChartPage />,
    },
  ],
  [
    {
      value: "revenueAll",
      icon: <DollarSign size={20} />,
      text: "Ingresos",
      alert: false,
      child: <RevenuePage />,
    },
    {
      value: "expenseAll",
      icon: <Receipt size={20} />,
      text: "Gastos",
      alert: false,
      child: <ExpensePage />,
    },
  ],
  [
    {
      value: "report",
      icon: <BookDown size={20} />,
      text: "Reporte",
      alert: false,
      child: <ExportPage />,
    },
  ],
];

interface SideBarProps {
  itemActive?: string;
}

export const SideBar: React.FC<SideBarProps> = ({
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
  const navigate = useNavigate();

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
                    navigate(`/${item.value}`);
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
