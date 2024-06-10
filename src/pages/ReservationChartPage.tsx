import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleDataTable } from "@/components/table/SimpleDataTable";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { SimpleChartBoard } from "../components/charts/SimpleChartBoard";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ChevronDown,
  CirclePercent,
  SquareArrowOutUpRight,
  Users,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GeneralBarChart } from "@/components/charts/GeneralBarChart";
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
import { IntervalData } from "@/types/Interval";
import { CircularProgress } from "@/components/CircularProgress";
import { fetchData } from "@/utils/Fetcher";
import { NormalCustomTooltip } from "@/components/charts/NormalCustomTooltip";

type RoomType = {
  id: string;
  type: string;
  enabled: boolean;
};

export const ReservationChartPage = () => {
  const colorsLight = colorManager({ type: "light" });
  const intervals = getIntervals();
  const [interval, setInterval] = useState<IntervalData>(getIntervals()[2]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data", interval],
    queryFn: () => fetchData(interval),
  });
  const [tabSelected, setTabSelected] = useState(0);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<RoomType[]>([]);
  const [dataRoomType, setDataRoomType] = useState<any[]>([]);
  const [roomColumns, setRoomColumns] = useState<string[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardInfoItem[]>([]);

  useEffect(() => {
    if (data) {
      const dataByRoomType = data.data.map((item) => {
        const obj: any = { date: item.date };
        item.rooms.forEach((room: any) => {
          if (
            selectedRoomTypes.find((type) => type.type === room.type)?.enabled
          ) {
            obj[room.type] = room.data["Occupied Rooms"];
          }
        });
        return obj;
      });
      setDataRoomType(dataByRoomType);
    }
  }, [selectedRoomTypes, data]);

  useEffect(() => {
    if (data) {
      const roomTypes: RoomType[] = [];
      const { minOccupied, maxOccupied } = data.data.reduce(
        (acc, current) => {
          if (current["Occupied Rooms"] < acc.minOccupied["Occupied Rooms"]) {
            acc.minOccupied = current;
          }
          if (current["Occupied Rooms"] > acc.maxOccupied["Occupied Rooms"]) {
            acc.maxOccupied = current;
          }
          return acc;
        },
        {
          minOccupied: { date: "", "Occupied Rooms": Infinity },
          maxOccupied: { date: "", "Occupied Rooms": 0 },
        }
      );
      const rooms =
        data?.data[0].rooms.map((room, index) => {
          roomTypes.push({
            id: index.toString(),
            type: room.type,
            enabled: true,
          });
          return room.type;
        }) || [];
      setRoomColumns(rooms);
      setSelectedRoomTypes(roomTypes);
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
          title: "Revenue % Diferencial",
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
          title: "Mayor Ocupación",
          mainContent: habFormatter(maxOccupied["Occupied Rooms"]),
          secondaryContent: `En ${maxOccupied.date}`,
          icon: <Users className="opacity-50" />,
        },
        {
          title: "Menor Ocupación",
          mainContent: habFormatter(minOccupied["Occupied Rooms"]),
          secondaryContent: `En ${minOccupied.date}`,
          icon: <Users className="opacity-50" />,
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

  const columnsTable: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Fecha",
    },
    {
      accessorKey: "Occupied Rooms",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hab. Ocupadas
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return habFormatter(row.original["Occupied Rooms"]);
      },
    },
    {
      accessorKey: "revenue",
      header: "Ingresos de Ocupación",
      cell: ({ row }) => {
        return formatter(row.original["Revenue of Reservations"]);
      },
    },
  ];

  const columnsTable2: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Fecha",
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
      accessorKey: "occupied",
      header: "Hab. Ocupadas",
      cell: ({ row }) => {
        return habFormatter(row.original["Occupied Rooms"]);
      },
    },
  ];

  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">Reservas</h1>
          {tabSelected === 0 && (
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
          )}
          {tabSelected === 1 && (
            <div className="flex gap-3">
              <DropdownMenu open={dropDownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto"
                    onClick={() => {
                      setDropDownOpen(true);
                    }}
                  >
                    <span className="font-normal">Habitaciones</span>{" "}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  onPointerDownOutside={() => {
                    setDropDownOpen(false);
                  }}
                >
                  {selectedRoomTypes &&
                    selectedRoomTypes.map((roomType) => (
                      <DropdownMenuCheckboxItem
                        key={roomType.id}
                        checked={roomType.enabled}
                        onCheckedChange={(checked) => {
                          setSelectedRoomTypes((prev) =>
                            prev.map((prevRoomType) =>
                              prevRoomType.id === roomType.id
                                ? { ...prevRoomType, enabled: checked }
                                : prevRoomType
                            )
                          );
                        }}
                      >
                        {roomType.type}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
          )}
        </div>
        <Tabs defaultValue="reservations-month">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger
              value="reservations-month"
              onClick={() => setTabSelected(0)}
            >
              Hab. Ocupadas
            </TabsTrigger>
            <TabsTrigger
              value="reservations-room-type"
              onClick={() => setTabSelected(1)}
            >
              Hab. Ocupadas por Tipo
            </TabsTrigger>
          </TabsList>
          <TabsContent value="reservations-month" className="mt-3">
            <SimpleChartBoard cardsInfo={cardsInfo} skeletonCards={isLoading}>
              <Card className="2xl:w-[63%] xl:w-[58%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[370px] md:h-[370px] pr-5 pl-5 pt-5 pb-5">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <CircularProgress size={150} strokeWidth={10} />
                  </div>
                ) : (
                  <GeneralBarChart
                    data={data?.data || []}
                    title="Habitaciones Ocupadas"
                    index="date"
                    categories={["Occupied Rooms"]}
                    colors={colorManager({ type: "dark", index: 4 })}
                    showAnimation
                    showLegend={false}
                    valueFormatter={habFormatter}
                    yAxisWidth={48}
                    customTooltip={(props: any) =>
                      NormalCustomTooltip(
                        props,
                        [{ key: "Occupied Rooms", value: "Hab. Ocupadas" }],
                        false,
                        "date",
                        formatter
                      )
                    }
                  />
                )}
              </Card>
              <TooltipDialog
                tooltipContent={<SquareArrowOutUpRight size={17} />}
                tooltipTrigger={
                  <ScrollArea className="2xl:w-[35%] xl:w-[40%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[680px] md:h-[680px] rounded-md border">
                    <SimpleDataTable<any>
                      columns={columnsTable}
                      data={data?.data || []}
                    />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                }
                tooltipOverlay
                dialogTitle="Datos de Reservas"
                dialogDescription={`Estos son los datos de Reservas para el intervalo seleccionado. ${interval.label}`}
                dialogContent={
                  <ScrollArea className="h-[70vh] px-5">
                    <SimpleDataTable<any>
                      columns={columnsTable}
                      data={data?.data || []}
                    />
                  </ScrollArea>
                }
                dialogCloseText="Cerrar"
              />
            </SimpleChartBoard>
          </TabsContent>
          <TabsContent value="reservations-room-type" className="mt-3">
            <SimpleChartBoard cardsInfo={cardsInfo}>
              <Card className="2xl:w-[63%] xl:w-[58%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[370px] md:h-[370px] pr-10 pt-5 pb-5">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <CircularProgress size={150} strokeWidth={10} />
                  </div>
                ) : (
                  <GeneralBarChart
                    data={dataRoomType}
                    index="date"
                    categories={roomColumns}
                    colors={colorsLight}
                    valueFormatter={habFormatter}
                    yAxisWidth={65}
                    showAnimation
                    selectable
                  />
                )}
              </Card>
              <TooltipDialog
                tooltipContent={<SquareArrowOutUpRight size={17} />}
                tooltipTrigger={
                  <ScrollArea className="2xl:w-[35%] xl:w-[40%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[680px] md:h-[680px] rounded-md border">
                    <SimpleDataTable<any>
                      columns={columnsTable2}
                      data={data?.data || []}
                    />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                }
                tooltipOverlay
                dialogTitle="Datos de Reservas"
                dialogDescription={`Estos son los datos de Reservas para el intervalo seleccionado. ${interval.label}`}
                dialogContent={
                  <ScrollArea className="h-[70vh] px-5">
                    <SimpleDataTable<any>
                      columns={columnsTable2}
                      data={data?.data || []}
                    />
                  </ScrollArea>
                }
                dialogCloseText="Cerrar"
              />
            </SimpleChartBoard>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
