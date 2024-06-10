import { CarouselTools } from "./CarouselTools";
import { Card } from "@/components/ui/card";
import { AreaChart } from "@tremor/react";
import { ToolItem } from "@/interfaces/ToolItem";
import { VerticalCards } from "./VerticalCards";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  CalendarRange,
  CircleDollarSign,
  DollarSign,
  PieChart,
  TicketPercent,
  TrendingDown,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { GeneralAreaChart } from "./charts/GeneralAreaChart";
import { NormalCustomTooltip } from "./charts/NormalCustomTooltip";
import {
  colorManager,
  formatter,
  getIntervals,
  habFormatter,
} from "@/utils/General";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/Fetcher";
import { useEffect, useState } from "react";
import { CircularProgress } from "./CircularProgress";

export const GraphicsMain = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: () => fetchData(getIntervals()[2]),
  });
  const [cardsInfo, setCardsInfo] = useState<CardInfoItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const maxOccupated = data.data.reduce(
        (prev: { value: number; date: any }, current: any) => {
          const currentValue = current["Occupied Rooms"];
          return prev.value > currentValue
            ? prev
            : { value: currentValue, date: current.date };
        },
        { value: 0, date: null }
      );
      const minOccupated = data.data.reduce(
        (prev: { value: number; date: any }, current: any) => {
          const currentValue = current["Occupied Rooms"];
          return prev.value < currentValue
            ? prev
            : { value: currentValue, date: current.date };
        },
        { value: Infinity, date: null }
      );
      setCardsInfo([
        {
          title: "Ingresos Totales",
          mainContent: `${formatter(data.total["Revenue"])}`,
          secondaryContent: `+${formatter(
            data.data[data.data.length - 1]["Revenue"]
          )} desde la última fecha`,
          icon: <DollarSign className="opacity-50 " />,
        },
        {
          title: "Gastos Totales",
          mainContent: formatter(data.total["Expense"]),
          secondaryContent: `+${formatter(
            data.data[data.data.length - 1]["Expense"]
          )} desde la última fecha`,
          icon: <DollarSign className="opacity-50" />,
        },
        {
          title: "Mayor Ocupación",
          mainContent: habFormatter(maxOccupated.value),
          secondaryContent: `En ${maxOccupated.date}`,
          icon: <UserPlus className="opacity-50" />,
        },
        {
          title: "Menor Ocupación",
          mainContent: habFormatter(minOccupated.value),
          secondaryContent: `En ${minOccupated.date}`,
          icon: <TrendingDown className="opacity-50" />,
        },
      ]);
    }
  }, [data]);

  const tools: ToolItem[] = [
    {
      title: "OCC",
      img: <TicketPercent />,
      onClick: () => {
        navigate("/occ");
      },
    },
    {
      title: "ADR",
      img: <CalendarRange />,
      onClick: () => {
        navigate("/adr");
      },
    },
    {
      title: "RevPAR",
      img: <TrendingUp />,
      onClick: () => {
        navigate("/revpar-trevpar");
      },
    },
    {
      title: "GopPAR",
      img: <PieChart />,
      onClick: () => {
        navigate("/goppar");
      },
    },
    {
      title: "Reservas",
      img: <BarChart3 />,
      onClick: () => {
        navigate("/bookings");
      },
    },
    {
      title: "Reservas",
      img: <CircleDollarSign />,
      onClick: () => {
        navigate("/revenue");
      },
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-[95%] items-start">
        <div className="flex flex-col justify-center items-center">
          <Card className="shadow-slate-300 p-5">
            <div className="2xl:w-[1040px] 2xl:h-[540px] xl:w-[680px] xl:h-[360px] lg:w-[580px] lg:h-[330px] md:w-[460px] md:h-[255px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <CircularProgress size={150} strokeWidth={10} />
                </div>
              ) : (
                <GeneralAreaChart
                  title="Ingresos / Gastos"
                  data={data?.data || []}
                  index="date"
                  categories={["Revenue", "Expense"]}
                  colors={[
                    colorManager({ type: "light", index: 4 }).toString(),
                    colorManager({ type: "light", index: 6 }).toString(),
                  ]}
                  yAxisWidth={75}
                  valueFormatter={formatter}
                  showAnimation
                  showLegend={false}
                  customTooltip={(props: any) =>
                    NormalCustomTooltip(
                      props,
                      [
                        { key: "Revenue", value: "Ingresos" },
                        { key: "Expense", value: "Gastos" },
                      ],
                      false,
                      "date",
                      formatter
                    )
                  }
                />
              )}
            </div>
          </Card>
        </div>
        <VerticalCards cards={cardsInfo} skeleton={isLoading} />
      </div>
      <CarouselTools tools={tools} />
    </div>
  );
};
