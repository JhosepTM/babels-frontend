import { SimpleChartBoard } from "@/components/charts/SimpleChartBoard";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipDialog } from "@/components/TooltipDialog";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { TbBrandCashapp } from "react-icons/tb";
import { MdPersonAddAlt } from "react-icons/md";
import { DonutChartHorizontal } from "@/components/charts/DonutChartHorizontal";
import { GeneralAreaChart } from "@/components/charts/GeneralAreaChart";
import { GeneralLineChart } from "@/components/charts/GeneralLineChart";
import { SimpleTableRowItem } from "@/interfaces/Table";
import { SimpleTable } from "../components/table/SimpleTable";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { SimpleDataTable } from "@/components/table/SimpleDataTable";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = [
  {
    type: "Basico",
    total: 1340,
    color: "bg-cyan-500",
  },
  {
    type: "Medio",
    total: 1200,
    color: "bg-blue-500",
  },
  {
    type: "Gold",
    total: 1000,
    color: "bg-indigo-500",
  },
  {
    type: "Platinum",
    total: 800,
    color: "bg-purple-500",
  },
  {
    type: "Diamond",
    total: 600,
    color: "bg-pink-500",
  },
  {
    type: "Silver",
    total: 400,
    color: "bg-red-500",
  },
  {
    type: "Bronze",
    total: 200,
    color: "bg-orange-500",
  },
];

const unitsNoSold = [
  { date: "Jan 22", total: 1340 },
  { date: "Feb 22", total: 1200 },
  { date: "Mar 22", total: 1000 },
  { date: "Apr 22", total: 800 },
  { date: "May 22", total: 600 },
  { date: "Jun 22", total: 400 },
  { date: "Jul 22", total: 200 },
  { date: "Aug 22", total: 1340 },
  { date: "Sep 22", total: 1200 },
  { date: "Oct 22", total: 1000 },
  { date: "Nov 22", total: 800 },
  { date: "Dec 22", total: 600 },
];

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

const simpleColumns: SimpleTableRowItem[] = [
  { value: "Name", className: "w-[100px]" },
  { value: "Average Total Units", className: "text-center" },
  { value: "Average Occupated", className: "text-center" },
  { value: "Average Available", className: "text-center" },
  { value: "Average Occupancy Rate", className: "text-center" },
  { value: "Gain", className: "text-center" },
];

const simpleRows: SimpleTableRowItem[][] = [
  [
    { value: "Basico", color: "bg-cyan-500" },
    { value: "75", className: "text-center" },
    { value: "40.5", className: "text-center" },
    { value: "4.5", className: "text-center" },
    { value: "$45,231.89", className: "text-center text-green-500" },
    { value: "0.25%", className: "text-center" },
  ],
  [
    { value: "Medio", color: "bg-blue-500" },
    { value: "75", className: "text-center" },
    { value: "40.5", className: "text-center" },
    { value: "4.5", className: "text-center" },
    { value: "$45,231.89", className: "text-center text-green-500" },
    { value: "0.25%", className: "text-center" },
  ],
  [
    { value: "Gold", color: "bg-indigo-500" },
    { value: "75", className: "text-center" },
    { value: "40.5", className: "text-center" },
    { value: "4.5", className: "text-center" },
    { value: "$45,231.89", className: "text-center text-green-500" },
    { value: "0.25%", className: "text-center" },
  ],
  [
    { value: "Platinum", color: "bg-purple-500" },
    { value: "75", className: "text-center" },
    { value: "40.5", className: "text-center" },
    { value: "4.5", className: "text-center" },
    { value: "$45,231.89", className: "text-center text-green-500" },
    { value: "0.25%", className: "text-center" },
  ],
  [
    { value: "Diamond", color: "bg-pink-500" },
    { value: "75", className: "text-center" },
    { value: "40.5", className: "text-center" },
    { value: "4.5", className: "text-center" },
    { value: "$45,231.89", className: "text-center text-green-500" },
    { value: "0.25%", className: "text-center" },
  ],
  [
    { value: "Silver", color: "bg-red-500" },
    { value: "75", className: "text-center" },
    { value: "40.5", className: "text-center" },
    { value: "4.5", className: "text-center" },
    { value: "$45,231.89", className: "text-center text-green-500" },
    { value: "0.25%", className: "text-center" },
  ],
  [
    { value: "Bronze", color: "bg-orange-500" },
    { value: "75", className: "text-center" },
    { value: "40.5", className: "text-center" },
    { value: "4.5", className: "text-center" },
    { value: "$45,231.89", className: "text-center text-green-500" },
    { value: "0.25%", className: "text-center" },
  ],
];

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      return <p className="text-left">{date}</p>;
    },
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
];

const dataOfTable: any[] = [
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
    gain: 15.0,
    gainPercentage: 0.2,
  },
  {
    date: "October 22",
    basic: 75,
    medium: 55,
    gold: 25,
    total: 155,
    gain: 10.0,
    gainPercentage: 0.1,
  },
  {
    date: "November 22",
    basic: 80,
    medium: 60,
    gold: 30,
    total: 170,
    gain: 15.0,
    gainPercentage: 0.2,
  },
  {
    date: "December 22",
    basic: 85,
    medium: 65,
    gold: 30,
    total: 180,
    gain: 10.0,
    gainPercentage: 0.1,
  },
  {
    date: "January 23",
    basic: 90,
    medium: 70,
    gold: 35,
    total: 195,
    gain: 15.0,
    gainPercentage: 0.2,
  },
  {
    date: "February 23",
    basic: 95,
    medium: 75,
    gold: 35,
    total: 205,
    gain: 10.0,
    gainPercentage: 0.1,
  },
  {
    date: "March 23",
    basic: 100,
    medium: 80,
    gold: 40,
    total: 220,
    gain: 15.0,
    gainPercentage: 0.2,
  },
  {
    date: "April 23",
    basic: 105,
    medium: 85,
    gold: 40,
    total: 230,
    gain: 10.0,
    gainPercentage: 0.1,
  },
  {
    date: "May 23",
    basic: 110,
    medium: 90,
    gold: 45,
    total: 245,
    gain: 15.0,
    gainPercentage: 0.2,
  },
  {
    date: "June 23",
    basic: 115,
    medium: 95,
    gold: 45,
    total: 255,
    gain: 10.0,
    gainPercentage: 0.1,
  },
  {
    date: "July 23",
    basic: 120,
    medium: 100,
    gold: 50,
    total: 270,
    gain: 15.0,
    gainPercentage: 0.2,
  },
];

export const OccupancyRatePage = () => {
  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">Occupancy Rate</h1>
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
        <div className="flex flex-col">
          <SimpleChartBoard cardsInfo={cardsInfo}>
            <Card className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[30%] 2xl:h-[240px] xl:h-[220px] lg:h-[220px] md:h-[160px] pt-3 pb-3 px-5">
              <DonutChartHorizontal
                title="Total Units"
                listTitle="Room Type"
                listValue="Total"
                data={data}
                index="type"
                category="total"
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
            <Card className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[30%] 2xl:h-[240px] xl:h-[220px] lg:h-[220px] md:h-[160px] pt-3 pb-3 px-5">
              <DonutChartHorizontal
                title="Units Sold"
                listTitle="Room Type"
                listValue="Total"
                data={data}
                index="type"
                category="total"
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
            <Card className="2xl:w-[38%] xl:w-[37%] lg:w-[36%] md:w-[35%] 2xl:h-[240px] xl:h-[220px] lg:h-[220px] md:h-[160px] pt-3 pb-3 2xl:px-5 xl:px-5 lg:px-5 md:px-2">
              <GeneralAreaChart
                title="Units No Sold"
                data={unitsNoSold}
                index="date"
                categories={["total"]}
                colors={["red"]}
                showLegend={false}
                curveType="natural"
                yAxisWidth={35}
              />
            </Card>
            <Card className="2xl:mt-2 xl:mt-4 w-full h-auto py-10 px-10">
              <div className="w-full 2xl:h-[400px] xl:h-[300px] lg:h-[300px] md:h-[250px]">
                <div className="flex justify-between">
                  <h3 className="text-2xl font-semibold">Occupancy Rate</h3>
                  <TooltipDialog
                    tooltipContent={<p>View data</p>}
                    tooltipTrigger={
                      <Button variant="outline" size="icon">
                        <SquareArrowOutUpRight size={15} />
                      </Button>
                    }
                    tooltipContentCursor={false}
                    trigger="content"
                    dialogCloseText="Close"
                    dialogTitle="Occupancy Rate Data"
                    dialogDescription="This is the occupancy rate data for the year 2022"
                    dialogContent={
                      <ScrollArea className="h-[70vh] px-5">
                        <SimpleDataTable<any>
                          columns={columns}
                          data={dataOfTable}
                        />
                      </ScrollArea>
                    }
                  />
                </div>
                <GeneralLineChart
                  data={unitsNoSold}
                  index="date"
                  categories={["total"]}
                  colors={["blue"]}
                  curveType="natural"
                  yAxisWidth={35}
                />
              </div>
              <div className="mt-14">
                <SimpleTable
                  columns={simpleColumns}
                  rows={simpleRows}
                  caption="Average Occupancy Rate"
                />
              </div>
            </Card>
          </SimpleChartBoard>
        </div>
      </Card>
    </div>
  );
};
