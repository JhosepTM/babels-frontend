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
import { GeneralAreaChart } from "@/components/charts/GeneralAreaChart";
import { GeneralBarList } from "../components/charts/GeneralBarList";
import { TooltipDialog } from "@/components/TooltipDialog";
import {
  CircleDollarSign,
  CirclePercent,
  DollarSign,
  SquareArrowOutUpRight,
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
  percentageChange,
} from "@/utils/General";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IntervalData } from "@/types/Interval";
import { CircularProgress } from "@/components/CircularProgress";
import { fetchData } from "@/utils/Fetcher";
import { NormalCustomTooltip } from "@/components/charts/NormalCustomTooltip";

export const GrossOperatingPage = () => {
  const intervals = getIntervals();
  const [interval, setInterval] = useState<IntervalData>(getIntervals()[2]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data", interval],
    queryFn: () => fetchData(interval),
  });
  const [roomColumns, setRoomColumns] = useState<string[]>([]);
  const [barList, setBarList] = useState<BarListItem[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardInfoItem[]>([]);

  useEffect(() => {
    if (data) {
      const list: BarListItem[] = [
        {
          name: "Total Ingresos",
          value: data.total["Revenue"],
          color: "green",
        },
        {
          name: "Total Gastos",
          value: data.total["Expense"],
          color: "red",
        },
      ];
      const maxExpense = { value: 0, date: "" };
      const maxRevenue = { value: 0, date: "" };
      data.data.forEach((item) => {
        if (item["Expense"] > maxExpense.value) {
          maxExpense.value = item["Expense"];
          maxExpense.date = item.date;
        }
        if (item["Revenue"] > maxRevenue.value) {
          maxRevenue.value = item["Revenue"];
          maxRevenue.date = item.date;
        }
      });
      const rooms = data?.data[0].rooms.map((room) => room.type) || [];
      setBarList(list);
      setRoomColumns(rooms);
      setCardsInfo([
        {
          title: "GopPAR % Diferencial",
          mainContent: `${
            percentageChange(data?.data || [], "GopPAR").percentage
          } %`,
          secondaryContent: `${addSign(
            percentageChange(data?.data || [], "GopPAR").value
          )} desde la última fecha`,
          icon: <CirclePercent className="opacity-50" />,
        },
        {
          title: "Beneficio Total",
          mainContent: `${formatter(
            data.total["Revenue"] - data.total["Expense"]
          )}`,
          secondaryContent: `${formatter(data.total["Revenue"])} - ${formatter(
            data.total["Expense"]
          )}`,
          icon: <CircleDollarSign className="opacity-50" />,
        },
        {
          title: "Mayor Ingreso",
          mainContent: formatter(maxRevenue.value),
          secondaryContent: `En ${maxRevenue.date}`,
          icon: <DollarSign className="opacity-50" />,
        },
        {
          title: "Max Expense",
          mainContent: formatter(maxExpense.value),
          secondaryContent: `En ${maxExpense.date}`,
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
      cell: ({ row }) => {
        const date = row.original.date;
        return <p className="text-left">{date}</p>;
      },
    },
    {
      accessorKey: "Expense",
      header: "Gastos",
      cell: ({ row }) => (
        <span className="text-red-400 font-semibold">
          {formatter(row.original.Expense)}
        </span>
      ),
    },
    {
      accessorKey: "Revenue",
      header: "Ingresos",
      cell: ({ row }) => (
        <span className="text-green-500 font-semibold">
          {formatter(row.original.Revenue)}
        </span>
      ),
    },
    {
      accessorKey: "GopPAR",
      header: "GopPAR",
      cell: ({ row }) => formatter(row.original.GopPAR),
    },
    ...roomColumns.map((room): ColumnDef<any> => {
      return {
        accessorKey: room,
        header: `Ingreso - ${room}`,
        cell: ({ row }) => {
          const roomType = row.original.rooms.find((r: any) => r.type === room);
          return formatter(
            roomType.data["Revenue of Reservations"] +
              roomType.data["Revenue of Rooms"]
          );
        },
      };
    }),
    ...roomColumns.map((room): ColumnDef<any> => {
      return {
        accessorKey: room,
        header: `Gasto - ${room}`,
        cell: ({ row }) => {
          const roomType = row.original.rooms.find((r: any) => r.type === room);
          return formatter(roomType.data["Expense"]);
        },
      };
    }),
  ];

  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">
            GopPAR - Beneficio Operativo Bruto por Hab. Disponible
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
            <div className="flex gap-4 w-full">
              <Card className="w-[60%] 2xl:h-[470px] xl:h-[430px] lg:h-[370px] md:h-[340px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <CircularProgress size={150} strokeWidth={10} />
                  </div>
                ) : (
                  <GeneralAreaChart
                    title="GopPAR"
                    data={data?.data || []}
                    index="date"
                    categories={["GopPAR"]}
                    colors={colorManager({ type: "dark", index: 3 })}
                    curveType="natural"
                    yAxisWidth={75}
                    valueFormatter={formatter}
                    showAnimation
                  />
                )}
              </Card>
              <div className="flex flex-col gap-4 w-[40%]">
                <Card className="2xl:h-[322px] xl:h-[280px] lg:h-[220px] md:h-[200px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <CircularProgress size={150} strokeWidth={10} />
                    </div>
                  ) : (
                    <GeneralLineChart
                      title="Total Ingresos/Gastos"
                      data={data?.data || []}
                      index="date"
                      categories={["Revenue", "Expense"]}
                      colors={[
                        colorManager({ type: "light", index: 4 }).toString(),
                        colorManager({ type: "light", index: 6 }).toString(),
                      ]}
                      curveType="linear"
                      valueFormatter={formatter}
                      yAxisWidth={85}
                      showAnimation
                      showLegend={false}
                      customTooltip={(props: any) =>
                        NormalCustomTooltip(
                          props,
                          [
                            { key: "Revenue", value: "Ingresos" },
                            { key: "Expense", value: "Gastos" }
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
                      <CircularProgress size={95} strokeWidth={10} />
                    </div>
                  ) : (
                    <GeneralBarList
                      title="Total Ingresos/Gastos"
                      data={barList}
                      valueFormatter={formatter}
                    />
                  )}
                </Card>
              </div>
            </div>
            <div className="w-full mt-6">
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
                dialogTitle="Datos GopPAR"
                dialogDescription={`Estos son los datos de GopPar para el intervalo seleccionado. ${interval.label}`}
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
