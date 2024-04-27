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
import { TbBrandCashapp } from "react-icons/tb";
import { MdPersonAddAlt } from "react-icons/md";
import { DonutChartGraphic } from "@/components/charts/DonutChartGraphic";
import { RoomsLineChart } from "../components/charts/LineChartGraphic";
import { SimpleTable } from "../components/table/SimpleTable";
import { ColumnDef } from "@tanstack/react-table";

const years = [
  { value: "2020", visible: true },
  { value: "2021", visible: true },
  { value: "2022", visible: true },
  { value: "2023", visible: true },
];

const cardsInfo: CardInfoItem[] = [
  {
    title: "Total Revenue",
    mainContent: "$45,231.89",
    secondaryContent: "+20.1% from last month",
    icon: TbBrandCashapp,
  },
  {
    title: "Subscriptions",
    mainContent: "+2350",
    secondaryContent: "+80.1% from last month",
    icon: MdPersonAddAlt,
  },
  {
    title: "Subscriptions",
    mainContent: "+2350",
    secondaryContent: "+80.1% from last month",
    icon: MdPersonAddAlt,
  },
  {
    title: "Total Revenue",
    mainContent: "$45,231.89",
    secondaryContent: "+20.1% from last month",
    icon: TbBrandCashapp,
  },
  /*{
    title: "Total Revenue",
    mainContent: "$45,231.89",
    secondaryContent: "+20.1% from last month",
    icon: TbBrandCashapp,
  },*/
];

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "basic",
    header: "Basico",
  },
  {
    accessorKey: "medium",
    header: "Medio",
  },
  {
    accessorKey: "gold",
    header: "Gold",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "gain",
    header: "Gain",
    cell: ({ row }) => {
      const gain = row.original.gain;
      if (gain > 0) {
        return <span className="text-green-500">+{gain}</span>;
      }
      return <span className="text-red-500">{gain}</span>;
    },
  },
  {
    accessorKey: "gainPercentage",
    header: "Gain Percentage",
    cell: ({ row }) => {
      const { gainPercentage, gain } = row.original;
      if (gain > 0) {
        return <span className="text-green-500">+{gainPercentage}%</span>;
      }
      return <span className="text-red-500">{gainPercentage}%</span>;
    },
  },
];

const data: any[] = [
  {
    date: "January 22",
    basic: 30,
    medium: 10,
    gold: 7,
    total: 47,
    gain: 24,
    gainPercentage: 0.5,
  },
  {
    date: "February 22",
    basic: 35,
    medium: 15,
    gold: 7,
    total: 57,
    gain: 14,
    gainPercentage: 0.3,
  },
  {
    date: "March 22",
    basic: 40,
    medium: 20,
    gold: 10,
    total: 70,
    gain: -2.0,
    gainPercentage: 0.1,
  },
  {
    date: "April 22",
    basic: 45,
    medium: 25,
    gold: 10,
    total: 80,
    gain: 5.0,
    gainPercentage: 0.1,
  },
  {
    date: "May 22",
    basic: 50,
    medium: 30,
    gold: 15,
    total: 95,
    gain: 10.0,
    gainPercentage: 0.2,
  },
  {
    date: "June 22",
    basic: 55,
    medium: 35,
    gold: 15,
    total: 105,
    gain: -15.0,
    gainPercentage: 0.3,
  },
  {
    date: "July 22",
    basic: 60,
    medium: 40,
    gold: 20,
    total: 120,
    gain: 5.0,
    gainPercentage: 0.1,
  },
  {
    date: "August 22",
    basic: 65,
    medium: 45,
    gold: 20,
    total: 130,
    gain: 5.0,
    gainPercentage: 0.1,
  },
];

export const RevenueChartPage = () => {
  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] 2xl:h-[1220px] xl:h-[980px] lg:h-[1040px] md:h-[1060px] shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">Revenue Chart</h1>
          <div className="flex gap-3">
            <Select onValueChange={(value) => console.log(value)}>
              <SelectTrigger className="w-[180px] hover:bg-accent hover:text-accent-foreground">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <SimpleChartBoard cardsInfo={cardsInfo}>
            <Card className="2xl:w-[67%] xl:w-[67%] lg:w-[65%] md:w-[65%] 2xl:h-[480px] xl:h-[410px] lg:h-[360px] md:h-[320px] pt-3 pb-3 px-5">
              <RoomsLineChart />
            </Card>
            <Card className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[30%] 2xl:h-[480px] xl:h-[410px] lg:h-[360px] md:h-[320px] pt-3 pb-3 px-5">
              <DonutChartGraphic />
            </Card>
          </SimpleChartBoard>
          <ScrollArea className="2xl:h-[340px] xl:h-[260px] lg:h-[480px] md:h-[480px] rounded-md border">
            <SimpleTable<any> columns={columns} data={data} />
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
};
