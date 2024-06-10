import { TooltipDialog } from "@/components/TooltipDialog";
import { DonutChartHorizontal } from "@/components/charts/DonutChartHorizontal";
import { GeneralAreaChart } from "@/components/charts/GeneralAreaChart";
import { SimpleChartBoard } from "@/components/charts/SimpleChartBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleDataTable } from "@/components/table/SimpleDataTable";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { ColumnDef } from "@tanstack/react-table";
import {
  CirclePercent,
  DollarSign,
  Receipt,
  SquareArrowOutUpRight,
  UserPlus,
} from "lucide-react";
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
import { NormalCustomTooltip } from "@/components/charts/NormalCustomTooltip";
import { GeneralLineChart } from "@/components/charts/GeneralLineChart";
import { IntervalData } from "@/types/Interval";
import { CircularProgress } from "@/components/CircularProgress";
import { fetchData } from "@/utils/Fetcher";

export const AvailableDailyRatePage = () => {
  const colorsLight = colorManager({ type: "light" });
  const intervals = getIntervals();
  const [interval, setInterval] = useState<IntervalData>(getIntervals()[2]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data", interval],
    queryFn: () => fetchData(interval),
  });
  const [revenueRooms, setRevenueRooms] = useState<any[]>([]);
  const [occupiedRooms, setOccupiedRooms] = useState<any[]>([]);
  const [adrHAB, setAdrHAB] = useState<any[]>([]);
  const [roomColumns, setRoomColumns] = useState<string[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardInfoItem[]>([]);

  useEffect(() => {
    if (!data) return;
    const colors = colorManager({ type: "light", bgIncluded: true });
    const roomData =
      data?.total.rooms.map((room: any, index: number) => ({
        type: room.type,
        revenue: {
          type: room.type,
          total: room.data["Revenue of Reservations"],
          color: colors[index],
        },
        occupied: {
          type: room.type,
          total: room.data["Occupied Rooms"],
          color: colors[index],
        },
      })) || [];

    const maxOccupied = { value: 0, date: "" };
    const maxRevenue = { value: 0, date: "" };
    const adrHAB =
      data.data.map((item: any) => {
        if (item["Occupied Rooms"] > maxOccupied.value) {
          maxOccupied.value = item["Occupied Rooms"];
          maxOccupied.date = item.date;
        }
        if (item["Revenue of Reservations"] > maxRevenue.value) {
          maxRevenue.value = item["Revenue of Reservations"];
          maxRevenue.date = item.date;
        }
        const adrHABItem: any = { date: item.date };

        item.rooms.forEach((room: any) => {
          if (room.data["Occupied Rooms"] > 0) {
            adrHABItem[room.type] = +(
              room.data["Revenue of Reservations"] / room.data["Occupied Rooms"]
            ).toFixed(5);
          } else {
            adrHABItem[room.type] = 0;
          }
        });

        return adrHABItem;
      }) || [];

    const rooms = roomData.map((room: any) => room.type);
    const revenue = roomData.map((room: any) => room.revenue);
    const occupied = roomData.map((room: any) => room.occupied);

    setRevenueRooms(revenue);
    setOccupiedRooms(occupied);
    setAdrHAB(adrHAB);
    setRoomColumns(rooms);
    setCardsInfo([
      {
        title: "ADR % Diferencial",
        mainContent: `${
          percentageChange(data?.data || [], "ADR").percentage
        } %`,
        secondaryContent: `${addSign(
          percentageChange(data.data || [], "ADR").value
        )} desde la última fecha`,
        icon: <CirclePercent className="opacity-50" />,
      },
      {
        title: "Ingreso Reservas",
        mainContent: formatter(data.total["Revenue of Reservations"] || 0),
        secondaryContent: `+${formatter(
          data?.data[data?.data.length - 1]["Revenue of Reservations"] || 0
        )} desde la última fecha`,
        icon: <DollarSign className="opacity-50" />,
      },
      {
        title: "Max Occupied Rooms",
        mainContent: habFormatter(maxOccupied.value),
        secondaryContent: `En ${maxOccupied.date}`,
        icon: <UserPlus className="opacity-50" />,
      },
      {
        title: "Max Revenue",
        mainContent: formatter(maxRevenue.value),
        secondaryContent: `En ${maxRevenue.date}`,
        icon: <Receipt className="opacity-50" />,
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
        header: `Ingreso - ${room}`,
        cell: ({ row }) => {
          const roomType = row.original.rooms.find((r: any) => r.type === room);
          return formatter(roomType.data["Revenue of Reservations"]);
        },
      };
    }),
    {
      accessorKey: "Revenue of Reservations",
      header: "Ingresos de Reservas",
      cell: ({ row }) => formatter(row.original["Revenue of Reservations"]),
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
    {
      accessorKey: "ADR",
      header: "ADR",
      cell: ({ row }) => formatter(row.original.ADR),
    },
  ];

  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">
            ADR - Tarifa Diaria Disponible
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
                {intervals.map((year) => (
                  <SelectItem key={year.label} value={year.label}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col">
          <SimpleChartBoard cardsInfo={cardsInfo} skeletonCards={isLoading}>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-4 w-[40%]">
                <Card className="2xl:h-[350px] xl:h-[280px] lg:h-[220px] md:h-[200px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <CircularProgress size={150} strokeWidth={10} />
                    </div>
                  ) : (
                    <GeneralAreaChart
                      title="Ingresos de Reservas"
                      data={data?.data || []}
                      index="date"
                      categories={["Revenue of Reservations"]}
                      colors={colorManager({ type: "dark", index: 3 })}
                      curveType="linear"
                      yAxisWidth={85}
                      valueFormatter={formatter}
                      showAnimation
                      showLegend={false}
                      customTooltip={(props: any) =>
                        NormalCustomTooltip(
                          props,
                          [
                            {
                              key: "Revenue of Reservations",
                              value: "Ingreso de Reservas",
                            },
                          ],
                          false,
                          "date",
                          formatter
                        )
                      }
                    />
                  )}
                </Card>
                <Card className="2xl:h-[350px] xl:h-[280px] lg:h-[220px] md:h-[200px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <CircularProgress size={150} strokeWidth={10} />
                    </div>
                  ) : (
                    <GeneralAreaChart
                      title="Hab. Ocupadas"
                      data={data?.data || []}
                      index="date"
                      categories={["Occupied Rooms"]}
                      colors={colorManager({ type: "light", index: 4 })}
                      curveType="linear"
                      yAxisWidth={48}
                      showAnimation
                      valueFormatter={habFormatter}
                      showLegend={false}
                      customTooltip={(props: any) =>
                        NormalCustomTooltip(
                          props,
                          [{ key: "Occupied Rooms", value: "Hab. Ocupadas" }],
                          false,
                          "date",
                          habFormatter
                        )
                      }
                    />
                  )}
                </Card>
              </div>
              <div className="flex flex-col w-[60%] 2xl:gap-2 xl:gap-0 lg:gap-0 md:gap-4">
                <div className="flex gap-4">
                  <Card className="w-[50%] 2xl:h-[240px] xl:h-[220px] lg:h-[220px] md:h-[160px] pt-3 pb-3 px-5">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <CircularProgress size={150} strokeWidth={10} />
                      </div>
                    ) : (
                      <DonutChartHorizontal
                        title="Ingresos por Habitación"
                        listTitle="Tipo Hab."
                        listValue="Total"
                        data={revenueRooms}
                        index="type"
                        category="total"
                        colors={colorsLight}
                        showAnimation
                        customTooltip
                        valueFormatter={formatter}
                      />
                    )}
                  </Card>
                  <Card className="w-[50%] 2xl:h-[240px] xl:h-[220px] lg:h-[220px] md:h-[160px] pt-3 pb-3 px-5">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <CircularProgress size={150} strokeWidth={10} />
                      </div>
                    ) : (
                      <DonutChartHorizontal
                        title="Hab. Ocupadas por Tipo"
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
                </div>
                <Card className="2xl:mt-2 xl:mt-4 w-full h-auto pt-4 pb-16 2xl:px-10 xl:px-10 lg:px-10 md:px-4">
                  <div className="w-full 2xl:h-[380px] xl:h-[258px] lg:h-[300px] md:h-[160px]">
                    <Tabs defaultValue="pax">
                      <div className="flex justify-between">
                        <h3 className="text-2xl font-semibold">ADR</h3>
                        <TabsList>
                          <TabsTrigger value="pax">PAX</TabsTrigger>
                          <TabsTrigger value="hab">HAB</TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="pax">
                        <div className="w-full 2xl:h-[380px] xl:h-[258px] lg:h-[300px] md:h-[160px]">
                          {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                              <CircularProgress size={150} strokeWidth={10} />
                            </div>
                          ) : (
                            <GeneralAreaChart
                              data={data?.data || []}
                              index="date"
                              categories={["ADR"]}
                              colors={colorManager({ type: "light", index: 3 })}
                              curveType="natural"
                              yAxisWidth={75}
                              showAnimation
                              showGradient={false}
                              customTooltip={(props: any) =>
                                NormalCustomTooltip(
                                  props,
                                  [
                                    { key: "Revenue", value: "Ingreso" },
                                    {
                                      key: "Occupied Rooms",
                                      value: "Hab. Ocupadas",
                                    },
                                  ],
                                  true,
                                  "date",
                                  formatter
                                )
                              }
                              valueFormatter={formatter}
                            />
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="hab">
                        <div className="w-full 2xl:h-[380px] xl:h-[258px] lg:h-[300px] md:h-[160px]">
                          <GeneralLineChart
                            data={adrHAB || []}
                            index="date"
                            categories={roomColumns}
                            colors={colorManager({ type: "light" })}
                            curveType="linear"
                            yAxisWidth={75}
                            valueFormatter={formatter}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </Card>
              </div>
            </div>
            <TooltipDialog
              tooltipContent={<SquareArrowOutUpRight size={17} />}
              tooltipTrigger={
                <ScrollArea className="2xl:mt-2 xl:mt-5 lg:mt-5 md:mt-2 w-full 2xl:h-[390px] xl:h-[260px] lg:h-[480px] md:h-[480px] rounded-md border">
                  <SimpleDataTable<any>
                    columns={columns}
                    data={data?.data || []}
                  />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              }
              tooltipOverlay
              dialogTitle="Datos ADR"
              dialogDescription={`Estos son los datos de ADR para el intervalo seleccionado. ${interval.label}`}
              dialogContent={
                <ScrollArea className="h-[70vh] xl:w-full md:w-[75vw] px-5">
                  <SimpleDataTable<any>
                    columns={columns}
                    data={data?.data || []}
                  />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              }
              dialogCloseText="Cerrar"
            />
          </SimpleChartBoard>
        </div>
      </Card>
    </div>
  );
};
