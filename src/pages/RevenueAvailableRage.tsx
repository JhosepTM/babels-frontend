import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SimpleChartBoard } from "@/components/charts/SimpleChartBoard";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralAreaChart } from "@/components/charts/GeneralAreaChart";
import { GeneralBarList } from "../components/charts/GeneralBarList";
import { TooltipDialog } from "@/components/TooltipDialog";
import {
  CirclePercent,
  DollarSign,
  SquareArrowOutUpRight,
  UserPlus,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SimpleDataTable } from "@/components/table/SimpleDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { GeneralLineChart } from "@/components/charts/GeneralLineChart";
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
import { IntervalData } from "@/types/Interval";
import { CircularProgress } from "@/components/CircularProgress";
import { fetchData } from "@/utils/Fetcher";
import { NormalCustomTooltip } from "@/components/charts/NormalCustomTooltip";

export const RevenueAvailablePage = () => {
  const intervals = getIntervals();
  const [interval, setInterval] = useState<IntervalData>(getIntervals()[2]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data", interval],
    queryFn: () => fetchData(interval),
  });
  const [reservationsRevenue, setReservationsRevenue] = useState<BarListItem[]>(
    []
  );
  const [totalRevenue, setTotalRevenue] = useState<BarListItem[]>([]);
  const [roomColumns, setRoomColumns] = useState<string[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardInfoItem[]>([]);

  useEffect(() => {
    if (data) {
      const reservationsRevenue: BarListItem[] = [
        {
          name: "Total",
          value: data.total["Revenue of Reservations"],
          color: "green",
        },
      ];
      const totalRevenue: BarListItem[] = [
        {
          name: "Total",
          value: data.total["Revenue"],
          color: "green",
        },
      ];
      const rooms = data?.data[0].rooms.map((room) => room.type) || [];
      setReservationsRevenue(reservationsRevenue);
      setTotalRevenue(totalRevenue);
      setRoomColumns(rooms);
      setCardsInfo([
        {
          title: "RevPAR % Diferencial",
          mainContent: `${
            percentageChange(data?.data || [], "RevPAR").percentage
          } %`,
          secondaryContent: `${addSign(
            percentageChange(data?.data || [], "RevPAR").value
          )} desde la última fecha`,
          icon: <CirclePercent className="opacity-50" />,
        },
        {
          title: "TRevPAR % Diferencial",
          mainContent: `${
            percentageChange(data?.data || [], "TRevPAR").percentage
          } %`,
          secondaryContent: `${addSign(
            percentageChange(data?.data || [], "TRevPAR").value
          )} desde la última fecha`,
          icon: <CirclePercent className="opacity-50" />,
        },
        {
          title: "Ingreso Reservas",
          mainContent: formatter(data?.total["Revenue of Reservations"] || 0),
          secondaryContent: `+${formatter(
            data?.data[data?.data.length - 1]["Revenue of Reservations"] || 0
          )} desde la última fecha`,
          icon: <DollarSign className="opacity-50" />,
        },
        {
          title: "Habitaciones Disponibles",
          mainContent: habFormatter(data?.total["Available Rooms"] || 0),
          secondaryContent: `${habFormatter(
            data?.data[data?.data.length - 1]["Available Rooms"] || 0
          )} desde la última fecha`,
          icon: <UserPlus className="opacity-50" />,
        },
      ]);
    }
    console.log("Refecth");
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
      header: "Ingresos",
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
    { accessorKey: "Available Rooms", header: "Hab. Disponibles" },
    {
      accessorKey: "RevPAR",
      header: "RevPAR",
      cell: ({ row }) => formatter(row.original.RevPAR),
    },
    {
      accessorKey: "TRevPAR",
      header: "TRevPAR",
      cell: ({ row }) => formatter(row.original.TRevPAR),
    },
  ];

  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">
            RevPAR - Ingreso por Hab. Disponible / TRevPAR - Ingresos Totales
            por Hab. Disponible
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
            <Tabs defaultValue="revpar" className="w-full">
              <TabsList>
                <TabsTrigger value="revpar">RevPAR</TabsTrigger>
                <TabsTrigger value="trevpar">TRevPAR</TabsTrigger>
              </TabsList>
              <TabsContent value="revpar">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-4 w-[40%]">
                    <Card className="2xl:h-[322px] xl:h-[280px] lg:h-[220px] md:h-[200px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <CircularProgress size={150} strokeWidth={10} />
                        </div>
                      ) : (
                        <GeneralLineChart
                          title="Ingreso de Reservas"
                          data={data?.data || []}
                          index="date"
                          categories={["Revenue of Reservations"]}
                          colors={colorManager({ type: "light", index: 1 })}
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
                    <Card className="p-4">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <CircularProgress size={50} strokeWidth={5} />
                        </div>
                      ) : (
                        <GeneralBarList
                          title="Ingreso de Reservas"
                          data={reservationsRevenue}
                          valueFormatter={formatter}
                          showAnimation
                        />
                      )}
                    </Card>
                  </div>
                  <Card className="w-[60%] 2xl:h-[432px] xl:h-[390px] lg:h-[330px] md:h-[300px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <CircularProgress size={150} strokeWidth={10} />
                      </div>
                    ) : (
                      <GeneralAreaChart
                        title="RevPAR"
                        data={data?.data || []}
                        index="date"
                        categories={["RevPAR"]}
                        colors={colorManager({ type: "dark", index: 3 })}
                        curveType="natural"
                        yAxisWidth={75}
                        valueFormatter={formatter}
                        showAnimation
                        showGradient={false}
                      />
                    )}
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="trevpar">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-4 w-[40%]">
                    <Card className="2xl:h-[322px] xl:h-[280px] lg:h-[220px] md:h-[200px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
                      <GeneralLineChart
                        title="Total Ingresos"
                        data={data?.data || []}
                        index="date"
                        categories={["Revenue"]}
                        colors={colorManager({ type: "light", index: 0 })}
                        curveType="linear"
                        yAxisWidth={85}
                        valueFormatter={formatter}
                        showAnimation
                        showLegend={false}
                        customTooltip={(props: any) =>
                          NormalCustomTooltip(
                            props,
                            [{ key: "Revenue", value: "Ingresos" }],
                            false,
                            "date",
                            formatter
                          )
                        }
                      />
                    </Card>
                    <Card className="p-4">
                      <GeneralBarList
                        title="Ingresos Totales"
                        data={totalRevenue}
                        valueFormatter={formatter}
                        showAnimation
                      />
                    </Card>
                  </div>
                  <Card className="w-[60%] 2xl:h-[432px] xl:h-[390px] lg:h-[330px] md:h-[300px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
                    <GeneralAreaChart
                      title="TRevPAR"
                      data={data?.data || []}
                      index="date"
                      categories={["TRevPAR"]}
                      colors={colorManager({ type: "dark", index: 5 })}
                      curveType="natural"
                      yAxisWidth={75}
                      valueFormatter={formatter}
                      showAnimation
                      showGradient={false}
                    />
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-6 w-full">
              <TooltipDialog
                tooltipContent={<SquareArrowOutUpRight size={17} />}
                tooltipTrigger={
                  <ScrollArea className="2xl:h-[390px] xl:h-[260px] lg:h-[480px] md:h-[480px] rounded-md border">
                    <SimpleDataTable<any>
                      columns={columns}
                      data={data?.data || []}
                    />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                }
                tooltipOverlay
                dialogTitle="Datos RevPAR/TRevPAR"
                dialogDescription={`Estos son los datos de RevPAR/TRevPAR para el intervalo seleccionado. ${interval.label}`}
                dialogContent={
                  <ScrollArea className="h-[70vh] md:w-[75vw] px-5">
                    <SimpleDataTable<any>
                      columns={columns}
                      data={data?.data || []}
                    />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                }
                dialogCloseText="Cerrar"
              />
            </div>
          </SimpleChartBoard>
        </div>
      </Card>
    </div>
  );
};
