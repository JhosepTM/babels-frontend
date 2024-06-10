import { SimpleChartBoard } from "@/components/charts/SimpleChartBoard";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipDialog } from "@/components/TooltipDialog";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { DonutChartHorizontal } from "@/components/charts/DonutChartHorizontal";
import { GeneralAreaChart } from "@/components/charts/GeneralAreaChart";
import { Button } from "@/components/ui/button";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  CirclePercent,
  SquareArrowOutUpRight,
  TrendingUp,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { SimpleDataTable } from "@/components/table/SimpleDataTable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProgressCustomTooltip } from "@/components/charts/ProgressCustomTooltip";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  addSign,
  badgeColor,
  colorManager,
  getIntervals,
  habFormatter,
  percentageChange,
  percentageFormatter,
} from "@/utils/General";
import { IntervalData } from "@/types/Interval";
import { CircularProgress } from "@/components/CircularProgress";
import { fetchData } from "@/utils/Fetcher";

type AccumulatorType = {
  maxOCC: { value: number; date: string };
  minOCC: { value: number; date: string };
  unoccupied: { date: string; Total: number }[];
};

export const OccupancyRatePage = () => {
  const colorsLight = colorManager({ type: "light" });
  const intervals = getIntervals();
  const [interval, setInterval] = useState<IntervalData>(getIntervals()[2]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data", interval],
    queryFn: () => fetchData(interval),
  });
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [occupiedRooms, setOccupiedRooms] = useState<any[]>([]);
  const [unoccupiedRooms, setUnoccupiedRooms] = useState<any[]>([]);
  const [roomColumns, setRoomColumns] = useState<string[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardInfoItem[]>([]);

  useEffect(() => {
    if (!data) return;
    const roomData =
      data.total.rooms.map((room: any, index: number) => ({
        type: room.type,
        available: {
          type: room.type,
          total: room.data["Available Rooms"],
          color: colorsLight[index],
        },
        occupied: {
          type: room.type,
          total: room.data["Occupied Rooms"],
          color: colorsLight[index],
        },
      })) || [];

    const rooms = roomData.map((room: any) => room.type);
    const available = roomData.map((room: any) => room.available);
    const occupied = roomData.map((room: any) => room.occupied);

    const getValue = (data: any, key: string) => data[key] || 0;

    const totalOccupied = data?.data.reduce(
      (total, item) => total + getValue(item, "Occupied Rooms"),
      0
    );
    const averageOccupied = totalOccupied
      ? totalOccupied / (data?.data.length || 0)
      : 0;

    const initialAcc: AccumulatorType = {
      maxOCC: { value: 0, date: "" },
      minOCC: { value: 100, date: "" },
      unoccupied: [],
    };

    const reducer = (acc: AccumulatorType, item: any) => {
      const occ = getValue(item, "OCC");
      const date = item.date;
      const Total =
        getValue(item, "Available Rooms") - getValue(item, "Occupied Rooms");

      if (occ > acc.maxOCC.value) {
        acc.maxOCC = { value: occ, date };
      }
      if (occ < acc.minOCC.value) {
        acc.minOCC = { value: occ, date };
      }
      acc.unoccupied.push({ date, Total });

      return acc;
    };

    const { maxOCC, minOCC, unoccupied } =
      data.data.reduce<AccumulatorType>(reducer, initialAcc) || initialAcc;

    setAvailableRooms(available);
    setOccupiedRooms(occupied);
    setUnoccupiedRooms(unoccupied || []);
    setRoomColumns(rooms);
    setCardsInfo([
      {
        title: "OCC % Diferencial",
        mainContent: `${
          percentageChange(data?.data || [], "OCC").percentage
        } %`,
        secondaryContent: `${addSign(
          percentageChange(data?.data || [], "OCC").value
        )} desde la última fecha`,
        icon: <CirclePercent className="opacity-50" />,
      },
      {
        title: "Mayor OCC",
        mainContent: percentageFormatter(maxOCC.value),
        secondaryContent: `En ${maxOCC.date}`,
        icon: <ArrowUpNarrowWide className="opacity-50" />,
      },
      {
        title: "Menor OCC",
        mainContent: percentageFormatter(minOCC.value),
        secondaryContent: `En ${minOCC.date}`,
        icon: <ArrowDownWideNarrow className="opacity-50" />,
      },
      {
        title: "Ocupación Promedio",
        mainContent: (+averageOccupied).toFixed(5).toString(),
        secondaryContent: `De ${data?.data.length} datos`,
        icon: <TrendingUp className="opacity-50" />,
      },
    ]);
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

  const columnsAverages: ColumnDef<any>[] = [
    {
      accessorKey: "roomType",
      header: "Tipo de Habitación",
      cell: ({ row }) => {
        console.log("index:", row.index);
        const roomType = row.original.type;
        return (
          <div className="flex space-x-3">
            <span
              className={`bg-${colorsLight[row.index]} ${badgeColor("line")}`}
              aria-hidden={true}
            />
            <span>{roomType}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "averageAvailable",
      header: "Promedio Disponible",
      cell: ({ row }) => {
        const averageAvailable =
          +row.original.data["Available Rooms"].toFixed(4);
        return averageAvailable;
      },
    },
    {
      accessorKey: "averageOccupied",
      header: "Promedio Ocupado",
      cell: ({ row }) => {
        const averageOccupied = +row.original.data["Occupied Rooms"].toFixed(4);
        return averageOccupied;
      },
    },
    {
      accessorKey: "averageUnoccupied",
      header: "Promedio Desocupado",
      cell: ({ row }) => {
        const averageUnoccupied = +(
          row.original.data["Available Rooms"] -
          row.original.data["Occupied Rooms"]
        ).toFixed(4);
        return averageUnoccupied;
      },
    },
    {
      accessorKey: "averageOCC",
      header: "Promedio OCC",
      cell: ({ row }) => {
        const averageOCC = +(
          row.original.data["Occupied Rooms"] /
          row.original.data["Available Rooms"]
        ).toFixed(4);
        return percentageFormatter(averageOCC);
      },
    },
  ];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ row }) => {
        const date = row.original.date;
        return <p className="text-left">{date}</p>;
      },
    },
    ...roomColumns.map((room): ColumnDef<any> => {
      return {
        accessorKey: room,
        header: `Ocupación - ${room}`,
        cell: ({ row }) => {
          const roomType = row.original.rooms.find((r: any) => r.type === room);
          return habFormatter(roomType.data["Occupied Rooms"]);
        },
      };
    }),
    {
      accessorKey: "Occupied Rooms",
      header: "Hab. Ocupadas",
      cell: ({ row }) => habFormatter(row.original["Occupied Rooms"]),
    },
    ...roomColumns.map((room): ColumnDef<any> => {
      return {
        accessorKey: room,
        header: `Disponible - ${room}`,
        cell: ({ row }) => {
          const roomType = row.original.rooms.find((r: any) => r.type === room);
          return habFormatter(roomType.data["Available Rooms"]);
        },
      };
    }),
    {
      accessorKey: "Available Rooms",
      header: "Hab. Disponibles",
      cell: ({ row }) => habFormatter(row.original["Available Rooms"]),
    },
    {
      accessorKey: "OCC",
      header: "OCC",
      cell: ({ row }) => percentageFormatter(row.original.OCC),
    },
  ];

  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">
            OCC - Porcentaje de Ocupación
          </h1>
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
        <div className="flex flex-col">
          <SimpleChartBoard cardsInfo={cardsInfo} skeletonCards={isLoading}>
            <Card className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[30%] 2xl:h-[240px] xl:h-[220px] lg:h-[220px] md:h-[160px] pt-3 pb-3 px-5">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <CircularProgress size={150} strokeWidth={10} />
                </div>
              ) : (
                <DonutChartHorizontal
                  title="Habitaciones Disponibles"
                  listTitle="Tipo Hab."
                  listValue="Total"
                  data={availableRooms}
                  index="type"
                  category="total"
                  colors={colorsLight}
                  showAnimation
                />
              )}
            </Card>
            <Card className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[30%] 2xl:h-[240px] xl:h-[220px] lg:h-[220px] md:h-[160px] pt-3 pb-3 px-5">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <CircularProgress size={150} strokeWidth={10} />
                </div>
              ) : (
                <DonutChartHorizontal
                  title="Habitaciones Ocupadas"
                  listTitle="Tipo Hab."
                  listValue="Total"
                  data={occupiedRooms}
                  index="type"
                  category="total"
                  colors={colorsLight}
                  showAnimation
                />
              )}
            </Card>
            <Card className="2xl:w-[38%] xl:w-[37%] lg:w-[36%] md:w-[35%] 2xl:h-[240px] xl:h-[220px] lg:h-[220px] md:h-[160px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <CircularProgress size={150} strokeWidth={10} />
                </div>
              ) : (
                <GeneralAreaChart
                  title="Habitaciones Desocupadas"
                  data={unoccupiedRooms}
                  index="date"
                  categories={["Total"]}
                  colors={colorManager({ type: "dark", index: 6 })}
                  showLegend={false}
                  curveType="linear"
                  yAxisWidth={50}
                  valueFormatter={habFormatter}
                  showAnimation
                />
              )}
            </Card>
            <Card className="2xl:mt-2 xl:mt-4 w-full h-auto py-10 px-10">
              <div className="w-full 2xl:h-[400px] xl:h-[300px] lg:h-[300px] md:h-[250px]">
                <div className="flex justify-between">
                  <h3 className="text-2xl font-semibold">Gráfico OCC</h3>
                  <TooltipDialog
                    tooltipContent={<p>Ver Tabla</p>}
                    tooltipTrigger={
                      <Button variant="outline" size="icon">
                        <SquareArrowOutUpRight size={15} />
                      </Button>
                    }
                    tooltipContentCursor={false}
                    trigger="content"
                    dialogCloseText="Cerrar"
                    dialogTitle="Datos de Ocupación"
                    dialogDescription={`Estos son los datos de ocupación de las habitaciones en el intervalo de tiempo seleccionado. ${interval.label}`}
                    dialogContent={
                      <div className="flex justify-center">
                        <ScrollArea className="h-[70vh] w-[75vw] px-5">
                          <SimpleDataTable<any>
                            columns={columns}
                            data={data?.data || []}
                          />
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    }
                  />
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <CircularProgress size={150} strokeWidth={10} />
                  </div>
                ) : (
                  <GeneralAreaChart
                    data={data?.data || []}
                    index="date"
                    categories={["OCC"]}
                    colors={colorManager({ type: "dark", index: 3 })}
                    curveType="natural"
                    yAxisWidth={45}
                    showGradient={false}
                    valueFormatter={percentageFormatter}
                    customTooltip={(props: any) =>
                      ProgressCustomTooltip(
                        props,
                        [
                          { key: "Occupied Rooms", value: "Hab. Ocupadas" },
                          { key: "Available Rooms", value: "Hab. Disponibles" },
                        ],
                        "date",
                        percentageFormatter
                      )
                    }
                    showAnimation
                  />
                )}
              </div>
              <div className="mt-14">
                <SimpleDataTable<any>
                  columns={columnsAverages}
                  data={data?.rooms_averages || []}
                />
              </div>
            </Card>
          </SimpleChartBoard>
        </div>
      </Card>
    </div>
  );
};
