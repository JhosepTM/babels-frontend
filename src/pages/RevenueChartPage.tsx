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
import { DonutChartVertical } from "@/components/charts/DonutChartVertical";
import { GeneralBarChart } from "../components/charts/GeneralBarChart";
import { SimpleDataTable } from "../components/table/SimpleDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { SquareArrowOutUpRight } from "lucide-react";
import { TooltipDialog } from "@/components/TooltipDialog";

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
  {
    date: "September 22",
    basic: 70,
    medium: 50,
    gold: 25,
    total: 145,
    gain: 5.0,
    gainPercentage: 0.1,
  },
  {
    date: "October 22",
    basic: 75,
    medium: 55,
    gold: 30,
    total: 160,
    gain: 5.0,
    gainPercentage: 0.1,
  },
  {
    date: "November 22",
    basic: 80,
    medium: 60,
    gold: 35,
    total: 175,
    gain: 5.0,
    gainPercentage: 0.1,
  },
  {
    date: "December 22",
    basic: 85,
    medium: 65,
    gold: 40,
    total: 190,
    gain: 5.0,
    gainPercentage: 0.1,
  },
  {
    date: "January 23",
    basic: 90,
    medium: 70,
    gold: 45,
    total: 205,
    gain: 5.0,
    gainPercentage: 0.1,
  },
  {
    date: "February 23",
    basic: 95,
    medium: 75,
    gold: 50,
    total: 220,
    gain: 5.0,
    gainPercentage: 0.1,
  },
];

const chartData = [
  {
    date: "Jan 22",
    Basico: 20,
    Medio: 10,
    Gold: 5,
  },
  {
    date: "Feb 22",
    Basico: 15,
    Medio: 12,
    Gold: 6,
  },
  {
    date: "Mar 22",
    Basico: 25,
    Medio: 8,
    Gold: 7,
  },
  {
    date: "Apr 22",
    Basico: 10,
    Medio: 15,
    Gold: 7,
  },
  {
    date: "May 22",
    Basico: 30,
    Medio: 10,
    Gold: 7,
  },
  {
    date: "Jun 22",
    Basico: 35,
    Medio: 15,
    Gold: 7,
  },
  {
    date: "Jul 22",
    Basico: 40,
    Medio: 20,
    Gold: 10,
  },
  {
    date: "Aug 22",
    Basico: 45,
    Medio: 425,
    Gold: 10,
  },
  {
    date: "Sep 22",
    Basico: 50,
    Medio: 30,
    Gold: 15,
  },
  {
    date: "Oct 22",
    Basico: 55,
    Medio: 835,
    Gold: 15,
  },
  {
    date: "Nov 22",
    Basico: 60,
    Medio: 240,
    Gold: 20,
  },
  {
    date: "Dec 22",
    Basico: 65,
    Medio: 145,
    Gold: 25,
  },
];

const dataDonut = [
  {
    type: "Basico",
    revenue: 1340,
    color: "bg-cyan-500",
  },
  {
    type: "Medio",
    revenue: 1200,
    color: "bg-blue-500",
  },
  {
    type: "Gold",
    revenue: 1000,
    color: "bg-indigo-500",
  },
  {
    type: "Platinum",
    revenue: 800,
    color: "bg-purple-500",
  },
  {
    type: "Diamond",
    revenue: 600,
    color: "bg-pink-500",
  },
  {
    type: "Silver",
    revenue: 400,
    color: "bg-red-500",
  },
  {
    type: "Bronze",
    revenue: 200,
    color: "bg-orange-500",
  },
];

const currencyFormatter = (number: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formatted;
};

export const RevenueChartPage = () => {
  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
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
        <div className="flex flex-col gap-5">
          <SimpleChartBoard cardsInfo={cardsInfo}>
            <Card className="2xl:w-[68%] xl:w-[68%] lg:w-[68%] md:w-[65%] 2xl:h-[480px] xl:h-[410px] lg:h-[360px] md:h-[320px] pt-3 pb-3 px-5">
              <GeneralBarChart
                title="Total Revenue Line Chart"
                data={chartData}
                index="date"
                stacked
                categories={["Basico", "Medio", "Gold"]}
                colors={["blue", "green", "red"]}
                yAxisWidth={65}
                valueFormatter={currencyFormatter}
              />
            </Card>
            <Card className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[30%] 2xl:h-[480px] xl:h-[410px] lg:h-[360px] md:h-[320px] pt-3 pb-3 px-5">
              <DonutChartVertical
                title="Revenue per Room Type"
                listTitle="Room Type"
                listValue="Revenue"
                data={dataDonut}
                index="type"
                category="revenue"
                colors={[
                  "cyan-500",
                  "blue-500",
                  "indigo-500",
                  "purple-500",
                  "pink-500",
                  "red-500",
                  "orange-500",
                ]}
              />
            </Card>
          </SimpleChartBoard>
          <TooltipDialog
            tooltipContent={<SquareArrowOutUpRight size={17} />}
            tooltipTrigger={
              <ScrollArea className="2xl:h-[390px] xl:h-[260px] lg:h-[480px] md:h-[480px] rounded-md border">
                <SimpleDataTable<any> columns={columns} data={data} />
              </ScrollArea>
            }
            tooltipOverlay
            dialogTitle="Revenue Data"
            dialogDescription="This is the revenue data for the year 2022"
            dialogContent={
              <ScrollArea className="h-[70vh] px-5">
                <SimpleDataTable<any> columns={columns} data={data} />
              </ScrollArea>
            }
            dialogCloseText="Close"
          />
        </div>
      </Card>
    </div>
  );
};
