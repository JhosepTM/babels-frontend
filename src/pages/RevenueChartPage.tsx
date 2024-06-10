import { Card } from "@/components/ui/card";
import { SimpleChartBoard } from "../components/charts/SimpleChartBoard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { DonutChartVertical } from "@/components/charts/DonutChartVertical";
import { GeneralBarChart } from "../components/charts/GeneralBarChart";
import { SimpleDataTable } from "../components/table/SimpleDataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CirclePercent,
  DollarSign,
  SquareArrowOutUpRight,
} from "lucide-react";
import { TooltipDialog } from "@/components/TooltipDialog";
import {
  addSign,
  colorManager,
  formatter,
  getIntervals,
  habFormatter,
  percentageChange,
} from "@/utils/General";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IntervalData } from "@/types/Interval";
import { CircularProgress } from "@/components/CircularProgress";
import { fetchData } from "@/utils/Fetcher";

export const RevenueChartPage = () => {
  const colorsLight = colorManager({ type: "light" });
  const intervals = getIntervals();
  const [interval, setInterval] = useState<IntervalData>(getIntervals()[2]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data", interval],
    queryFn: () => fetchData(interval),
  });
  const [revenueRooms, setRevenueRooms] = useState<any[]>([]);
  const [revenueRoomsStacked, setRevenueRoomsStacked] = useState<any[]>([]);
  const [roomColumns, setRoomColumns] = useState<string[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardInfoItem[]>([]);

  useEffect(() => {
    if (data) {
      const revenueRoomsTemp = data.total.rooms.map(
        (item: any, index: number) => {
          return {
            type: item.type,
            "Revenue of Reservations": item.data["Revenue of Reservations"],
            color: colorsLight[index],
          };
        }
      );
      const rooms = data?.data[0].rooms.map((room) => room.type) || [];
      const revenueRoomsStackedTemp = data.data.map((item: any) => {
        const roomData = rooms.reduce((acc: any, room: string) => {
          const roomItem = item.rooms.find((r: any) => r.type === room);
          acc[room] = roomItem ? roomItem.data["Revenue of Reservations"] : 0;
          return acc;
        }, {});
        return {
          date: item.date,
          ...roomData,
        };
      });
      const { minRevenue, maxRevenue } = data.data.reduce(
        (acc, current) => {
          if (
            current["Revenue of Reservations"] <
            acc.minRevenue["Revenue of Reservations"]
          ) {
            acc.minRevenue = current;
          }
          if (
            current["Revenue of Reservations"] >
            acc.maxRevenue["Revenue of Reservations"]
          ) {
            acc.maxRevenue = current;
          }
          return acc;
        },
        {
          minRevenue: { date: "", "Revenue of Reservations": Infinity },
          maxRevenue: { date: "", "Revenue of Reservations": 0 },
        }
      );
      setRevenueRooms(revenueRoomsTemp);
      setRoomColumns(rooms);
      setRevenueRoomsStacked(revenueRoomsStackedTemp);
      setCardsInfo([
        {
          title: "% Diferencial de Ocupación",
          mainContent: `${
            percentageChange(data?.data || [], "Occupied Rooms").percentage
          } %`,
          secondaryContent: `${addSign(
            percentageChange(data?.data || [], "Occupied Rooms").value
          )} desde la última fecha`,
          icon: <CirclePercent className="opacity-50" />,
        },
        {
          title: "% Diferencial de Ingresos",
          mainContent: `${
            percentageChange(data?.data || [], "Revenue of Reservations")
              .percentage
          } %`,
          secondaryContent: `${addSign(
            percentageChange(data?.data || [], "Revenue of Reservations").value
          )} desde la última fecha`,
          icon: <CirclePercent className="opacity-50" />,
        },
        {
          title: "Mayor Ingreso",
          mainContent: formatter(maxRevenue["Revenue of Reservations"]),
          secondaryContent: `En ${maxRevenue.date}`,
          icon: <DollarSign className="opacity-50" />,
        },
        {
          title: "Menor Ingreso",
          mainContent: formatter(minRevenue["Revenue of Reservations"]),
          secondaryContent: `En ${minRevenue.date}`,
          icon: <DollarSign className="opacity-50" />,
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [interval, refetch]);

  const updateInterval = (value: string) => {
    const selectedInterval = intervals.find(
      (interval) => interval.label === value
    );

    if (selectedInterval) {
      setInterval(selectedInterval);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Fecha",
    },
    ...roomColumns.map((room): ColumnDef<any> => {
      return {
        accessorKey: room,
        header: `Ingreso - ${room}`,
        cell: ({ row }) => {
          const roomType = row.original.rooms.find((r: any) => r.type === room);
          return formatter(roomType.data["Revenue of Reservations"]);
        },
      };
    }),
    {
      accessorKey: "Occupied Rooms",
      header: "Habitaciones Ocupadas",
      cell: ({ row }) => {
        return habFormatter(row.original["Occupied Rooms"]);
      },
    },
    {
      accessorKey: "Revenue of Reservations",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ingresos
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <span className="text-green-500 font-semibold">
            {formatter(row.original["Revenue of Reservations"])}
          </span>
        );
      },
    },
  ];

  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">Ingreso de Reservas</h1>
          <div className="flex gap-3">
            <Select
              onValueChange={(value) => updateInterval(value)}
              value={interval.label}
            >
              <SelectTrigger className="w-[180px] hover:bg-accent hover:text-accent-foreground">
                <SelectValue placeholder="Select Interval" />
              </SelectTrigger>
              <SelectContent>
                {intervals.map((interval) => (
                  <SelectItem key={interval.label} value={interval.label}>
                    {interval.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <SimpleChartBoard cardsInfo={cardsInfo} skeletonCards={isLoading}>
            <Card className="2xl:w-[68%] xl:w-[68%] lg:w-[68%] md:w-[65%] 2xl:h-[480px] xl:h-[410px] lg:h-[360px] md:h-[320px] pt-3 pb-3 px-5">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <CircularProgress size={150} strokeWidth={10} />
                </div>
              ) : (
                <GeneralBarChart
                  title="Ingresos por Tipo de Habitación"
                  data={revenueRoomsStacked}
                  index="date"
                  stacked
                  categories={roomColumns}
                  colors={colorsLight}
                  yAxisWidth={85}
                  valueFormatter={formatter}
                  selectable
                  showAnimation
                />
              )}
            </Card>
            <Card className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[30%] 2xl:h-[480px] xl:h-[410px] lg:h-[360px] md:h-[320px] pt-3 pb-3 px-5">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <CircularProgress size={150} strokeWidth={10} />
                </div>
              ) : (
                <DonutChartVertical
                  title="Ingresos por Tipo"
                  listTitle="Room Type"
                  listValue="Revenue"
                  data={revenueRooms}
                  index="type"
                  category="Revenue of Reservations"
                  colors={colorsLight}
                  valueFormatter={formatter}
                  formatList
                  showAnimation
                />
              )}
            </Card>
          </SimpleChartBoard>
          <TooltipDialog
            tooltipContent={<SquareArrowOutUpRight size={17} />}
            tooltipTrigger={
              <ScrollArea className="2xl:h-[390px] xl:h-[260px] lg:h-[480px] md:h-[480px] rounded-md border">
                <SimpleDataTable<any>
                  columns={columns}
                  data={data?.data || []}
                />
              </ScrollArea>
            }
            tooltipOverlay
            dialogTitle="Datos de Ingreso de Reservas"
            dialogDescription={`Estos son los datos de Ingreso de Reservas para el intervalo seleccionado. ${interval.label}`}
            dialogContent={
              <ScrollArea className="h-[70vh] px-5">
                <SimpleDataTable<any>
                  columns={columns}
                  data={data?.data || []}
                />
              </ScrollArea>
            }
            dialogCloseText="Cerrar"
          />
        </div>
      </Card>
    </div>
  );
};
