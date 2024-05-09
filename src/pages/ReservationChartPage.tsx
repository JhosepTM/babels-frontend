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

import { TbBrandCashapp } from "react-icons/tb";
import { MdPersonAddAlt } from "react-icons/md";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { SimpleChartBoard } from "../components/charts/SimpleChartBoard";
import {
  TableComparativeReservation,
  TableItemReservation,
} from "@/interfaces/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, SquareArrowOutUpRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GeneralBarChart } from "@/components/charts/GeneralBarChart";
import { TooltipDialog } from "@/components/TooltipDialog";

const chartData = [
  { date: "Jan 22", "Number of room reservations": 54 },
  { date: "Feb 22", "Number of room reservations": 45 },
  { date: "Mar 22", "Number of room reservations": 65 },
  { date: "Apr 22", "Number of room reservations": 32 },
  { date: "May 22", "Number of room reservations": 67 },
  { date: "Jun 22", "Number of room reservations": 76 },
  { date: "Jul 22", "Number of room reservations": 70 },
  { date: "Aug 22", "Number of room reservations": 80 },
  { date: "Sep 22", "Number of room reservations": 90 },
  { date: "Oct 22", "Number of room reservations": 100 },
  { date: "Nov 22", "Number of room reservations": 110 },
  { date: "Dec 22", "Number of room reservations": 120 },
];

const charDataRoomType = [
  {
    date: "Jan",
    Basico: 20,
    Medio: 10,
    Gold: 5,
    Platinum: 4,
    Diamond: 3,
    Silver: 2,
    Bronze: 1,
  },
  {
    date: "Feb",
    Basico: 15,
    Medio: 12,
    Gold: 6,
    Platinum: 5,
    Diamond: 4,
    Silver: 3,
    Bronze: 2,
  },
  {
    date: "Mar",
    Basico: 25,
    Medio: 8,
    Gold: 7,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "Apr",
    Basico: 10,
    Medio: 15,
    Gold: 7,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "May",
    Basico: 30,
    Medio: 10,
    Gold: 7,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "Jun",
    Basico: 35,
    Medio: 15,
    Gold: 7,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "Jul",
    Basico: 40,
    Medio: 20,
    Gold: 10,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "Aug",
    Basico: 45,
    Medio: 25,
    Gold: 10,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "Sep",
    Basico: 50,
    Medio: 30,
    Gold: 15,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "Oct",
    Basico: 55,
    Medio: 35,
    Gold: 15,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "Nov",
    Basico: 60,
    Medio: 40,
    Gold: 20,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
  {
    date: "Dec",
    Basico: 65,
    Medio: 45,
    Gold: 20,
    Platinum: 6,
    Diamond: 5,
    Silver: 4,
    Bronze: 3,
  },
];

const charDataComparative = [
  { date: "Jan", "2022": 45, "2023": 30 },
  { date: "Feb", "2022": 50, "2023": 35 },
  { date: "Mar", "2022": 55, "2023": 40 },
  { date: "Apr", "2022": 60, "2023": 45 },
  { date: "May", "2022": 65, "2023": 50 },
  { date: "Jun", "2022": 70, "2023": 55 },
  { date: "Jul", "2022": 75, "2023": 60 },
  { date: "Aug", "2022": 80, "2023": 65 },
  { date: "Sep", "2022": 85, "2023": 70 },
  { date: "Oct", "2022": 90, "2023": null },
  { date: "Nov", "2022": 95, "2023": null },
  { date: "Dec", "2022": 100, "2023": null },
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

const dataTable: TableItemReservation[] = [
  {
    id: "1",
    month: "January",
    numberReservations: 20,
    revenue: 2000,
  },
  {
    id: "2",
    month: "February",
    numberReservations: 30,
    revenue: 3000,
  },
  {
    id: "3",
    month: "March",
    numberReservations: 40,
    revenue: 4000,
  },
  {
    id: "4",
    month: "April",
    numberReservations: 50,
    revenue: 5000,
  },
  {
    id: "5",
    month: "May",
    numberReservations: 60,
    revenue: 6000,
  },
  {
    id: "6",
    month: "June",
    numberReservations: 70,
    revenue: 7000,
  },
  {
    id: "7",
    month: "July",
    numberReservations: 80,
    revenue: 8000,
  },
  {
    id: "8",
    month: "August",
    numberReservations: 90,
    revenue: 9000,
  },
  {
    id: "9",
    month: "September",
    numberReservations: 100,
    revenue: 10000,
  },
  {
    id: "10",
    month: "October",
    numberReservations: 110,
    revenue: 11000,
  },
  {
    id: "11",
    month: "November",
    numberReservations: 120,
    revenue: 12000,
  },
  {
    id: "12",
    month: "December",
    numberReservations: 130,
    revenue: 13000,
  },
  {
    id: "13",
    month: "January",
    numberReservations: 20,
    revenue: 2000,
  },
];

const columnsTable: ColumnDef<TableItemReservation>[] = [
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "numberReservations",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reservations
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
];

const columnsTable2: ColumnDef<any>[] = [
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "basico",
    header: "Basico",
  },
  {
    accessorKey: "medio",
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
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
];

const dataTable2: any[] = [
  {
    id: "1",
    month: "January",
    basico: 20,
    medio: 30,
    gold: 14,
    total: 64,
    revenue: 6400,
  },
  {
    id: "2",
    month: "February",
    basico: 25,
    medio: 31,
    gold: 24,
    total: 80,
    revenue: 8000,
  },
  {
    id: "3",
    month: "March",
    basico: 30,
    medio: 40,
    gold: 34,
    total: 104,
    revenue: 10400,
  },
  {
    id: "4",
    month: "April",
    basico: 35,
    medio: 50,
    gold: 44,
    total: 129,
    revenue: 12900,
  },
  {
    id: "5",
    month: "May",
    basico: 40,
    medio: 60,
    gold: 54,
    total: 154,
    revenue: 14400,
  },
  {
    id: "6",
    month: "June",
    basico: 25,
    medio: 10,
    gold: 4,
    total: 39,
    revenue: 3900,
  },
  {
    id: "7",
    month: "July",
    basico: 30,
    medio: 20,
    gold: 14,
    total: 64,
    revenue: 6400,
  },
  {
    id: "8",
    month: "August",
    basico: 35,
    medio: 30,
    gold: 24,
    total: 89,
    revenue: 8900,
  },
  {
    id: "9",
    month: "September",
    basico: 40,
    medio: 40,
    gold: 34,
    total: 114,
    revenue: 11400,
  },
  {
    id: "10",
    month: "October",
    basico: 45,
    medio: 50,
    gold: 44,
    total: 139,
    revenue: 13900,
  },
  {
    id: "11",
    month: "November",
    basico: 50,
    medio: 60,
    gold: 54,
    total: 164,
    revenue: 16400,
  },
  {
    id: "12",
    month: "December",
    basico: 55,
    medio: 70,
    gold: 64,
    total: 189,
    revenue: 18900,
  },
];

const columnsTable3: ColumnDef<TableComparativeReservation>[] = [
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "reservationsFirstYear",
    header: "Reservations First Year",
  },
  {
    accessorKey: "revenueFirstYear",
    header: "Revenue First Year",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenueFirstYear"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "reservationsSecondYear",
    header: "Reservations Second Year",
  },
  {
    accessorKey: "revenueSecondYear",
    header: "Revenue Second Year",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenueSecondYear"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center">{formatted}</div>;
    },
  },
];

const dataTable3: TableComparativeReservation[] = [
  {
    id: "1",
    month: "January",
    reservationsFirstYear: 20,
    revenueFirstYear: 2000,
    reservationsSecondYear: 30,
    revenueSecondYear: 3000,
  },
  {
    id: "2",
    month: "February",
    reservationsFirstYear: 30,
    revenueFirstYear: 3000,
    reservationsSecondYear: 40,
    revenueSecondYear: 4000,
  },
  {
    id: "3",
    month: "March",
    reservationsFirstYear: 40,
    revenueFirstYear: 4000,
    reservationsSecondYear: 50,
    revenueSecondYear: 5000,
  },
  {
    id: "4",
    month: "April",
    reservationsFirstYear: 50,
    revenueFirstYear: 5000,
    reservationsSecondYear: 60,
    revenueSecondYear: 6000,
  },
  {
    id: "5",
    month: "May",
    reservationsFirstYear: 60,
    revenueFirstYear: 6000,
    reservationsSecondYear: 70,
    revenueSecondYear: 7000,
  },
  {
    id: "6",
    month: "June",
    reservationsFirstYear: 70,
    revenueFirstYear: 7000,
    reservationsSecondYear: 80,
    revenueSecondYear: 8000,
  },
  {
    id: "7",
    month: "July",
    reservationsFirstYear: 80,
    revenueFirstYear: 8000,
    reservationsSecondYear: 90,
    revenueSecondYear: 9000,
  },
  {
    id: "8",
    month: "August",
    reservationsFirstYear: 90,
    revenueFirstYear: 9000,
    reservationsSecondYear: 100,
    revenueSecondYear: 10000,
  },
  {
    id: "9",
    month: "September",
    reservationsFirstYear: 100,
    revenueFirstYear: 10000,
    reservationsSecondYear: 110,
    revenueSecondYear: 11000,
  },
  {
    id: "10",
    month: "October",
    reservationsFirstYear: 110,
    revenueFirstYear: 11000,
    reservationsSecondYear: 120,
    revenueSecondYear: 12000,
  },
  {
    id: "11",
    month: "November",
    reservationsFirstYear: 120,
    revenueFirstYear: 12000,
    reservationsSecondYear: 130,
    revenueSecondYear: 13000,
  },
  {
    id: "12",
    month: "December",
    reservationsFirstYear: 130,
    revenueFirstYear: 13000,
    reservationsSecondYear: 140,
    revenueSecondYear: 14000,
  },
];

const roomTypes = [
  { id: "1", type: "Basico", enabled: false },
  { id: "2", type: "Medio", enabled: false },
  { id: "3", type: "Gold", enabled: false },
];

const years = [
  { value: "2020", visible: true },
  { value: "2021", visible: true },
  { value: "2022", visible: true },
  { value: "2023", visible: true },
];

export const BarChartPage = () => {
  const [tabSelected, setTabSelected] = useState(0);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState(roomTypes);
  const [firstYear, setFirstYear] = useState("");
  const [secondYear, setSecondYear] = useState("");

  useEffect(() => {
    console.log(selectedRoomTypes);
  }, [selectedRoomTypes]);

  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">Bar Chart</h1>
          <div className="flex gap-3">
            {tabSelected === 1 && (
              <DropdownMenu open={dropDownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto"
                    onClick={() => {
                      setDropDownOpen(true);
                    }}
                  >
                    Rooms <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  onPointerDownOutside={() => {
                    setDropDownOpen(false);
                  }}
                >
                  {selectedRoomTypes.map((roomType) => (
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
            )}
            {(tabSelected === 0 || tabSelected === 1) && (
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
            )}
            {tabSelected === 2 && (
              <div className="flex gap-3">
                <Select onValueChange={(year) => setFirstYear(year)}>
                  <SelectTrigger className="w-[180px] hover:bg-accent hover:text-accent-foreground">
                    <SelectValue placeholder="Select First Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(
                      (year) =>
                        year.value !== secondYear && (
                          <SelectItem key={year.value} value={year.value}>
                            {year.value}
                          </SelectItem>
                        )
                    )}
                  </SelectContent>
                </Select>
                <Select onValueChange={(year) => setSecondYear(year)}>
                  <SelectTrigger className="w-[180px] hover:bg-accent hover:text-accent-foreground">
                    <SelectValue placeholder="Select Second B" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(
                      (year) =>
                        firstYear !== year.value && (
                          <SelectItem key={year.value} value={year.value}>
                            {year.value}
                          </SelectItem>
                        )
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        <Tabs defaultValue="reservations-month">
          <TabsList className="grid grid-cols-3 w-[700px]">
            <TabsTrigger
              value="reservations-month"
              onClick={() => setTabSelected(0)}
            >
              Reservations per month
            </TabsTrigger>
            <TabsTrigger
              value="reservations-room-type"
              onClick={() => setTabSelected(1)}
            >
              Reservations per room type
            </TabsTrigger>
            <TabsTrigger
              value="comparative-year"
              onClick={() => setTabSelected(2)}
            >
              Comparative reservations per year
            </TabsTrigger>
          </TabsList>
          <TabsContent value="reservations-month" className="mt-3">
            <SimpleChartBoard cardsInfo={cardsInfo}>
              <Card className="2xl:w-[63%] xl:w-[58%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[370px] md:h-[370px] pr-10 pt-5 pb-5">
                <GeneralBarChart
                  data={chartData}
                  index="date"
                  categories={["Number of room reservations"]}
                  colors={["blue"]}
                />
              </Card>
              <TooltipDialog
                tooltipContent={<SquareArrowOutUpRight size={17} />}
                tooltipTrigger={
                  <ScrollArea className="2xl:w-[35%] xl:w-[40%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[680px] md:h-[680px] rounded-md border">
                    <SimpleDataTable<TableItemReservation>
                      columns={columnsTable}
                      data={dataTable}
                    />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                }
                tooltipOverlay
                dialogTitle="Revenue Data"
                dialogDescription="This is the revenue data for the year 2022"
                dialogContent={
                  <ScrollArea className="h-[70vh] px-5">
                    <SimpleDataTable<TableItemReservation>
                      columns={columnsTable}
                      data={dataTable}
                    />
                  </ScrollArea>
                }
                dialogCloseText="Close"
              />
            </SimpleChartBoard>
          </TabsContent>
          <TabsContent value="reservations-room-type" className="mt-3">
            <SimpleChartBoard cardsInfo={cardsInfo}>
              <Card className="2xl:w-[63%] xl:w-[58%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[370px] md:h-[370px] pr-10 pt-5 pb-5">
                <GeneralBarChart
                  data={charDataRoomType}
                  index="date"
                  categories={[
                    "Basico",
                    "Medio",
                    "Gold",
                    "Platinum",
                    "Diamond",
                    "Silver",
                    "Bronze",
                  ]}
                  colors={[
                    "blue",
                    "green",
                    "red",
                    "purple",
                    "yellow",
                    "gray",
                    "orange",
                  ]}
                />
              </Card>
              <TooltipDialog
                tooltipContent={<SquareArrowOutUpRight size={17} />}
                tooltipTrigger={
                  <ScrollArea className="2xl:w-[35%] xl:w-[40%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[680px] md:h-[680px] rounded-md border">
                    <SimpleDataTable<any>
                      columns={columnsTable2}
                      data={dataTable2}
                    />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                }
                tooltipOverlay
                dialogTitle="Revenue Data"
                dialogDescription="This is the revenue data for the year 2022"
                dialogContent={
                  <ScrollArea className="h-[70vh] px-5">
                    <SimpleDataTable<any>
                      columns={columnsTable2}
                      data={dataTable2}
                    />
                  </ScrollArea>
                }
                dialogCloseText="Close"
              />
            </SimpleChartBoard>
          </TabsContent>
          <TabsContent value="comparative-year" className="mt-3">
            <SimpleChartBoard cardsInfo={cardsInfo}>
              <Card className="2xl:w-[55%] xl:w-[58%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[370px] md:h-[370px] pr-10 pt-5 pb-5">
                <GeneralBarChart
                  data={charDataComparative}
                  index="date"
                  categories={["2022", "2023"]}
                  colors={["gray", "blue"]}
                  selectable
                />
              </Card>
              <TooltipDialog
                tooltipContent={<SquareArrowOutUpRight size={17} />}
                tooltipTrigger={
                  <ScrollArea className="2xl:w-[43%] xl:w-[40%] lg:w-[100%] md:w-[100%] 2xl:h-[500px] xl:h-[370px] lg:h-[680px] md:h-[680px]  rounded-md border">
                    <SimpleDataTable<TableComparativeReservation>
                      columns={columnsTable3}
                      data={dataTable3}
                    />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                }
                tooltipOverlay
                dialogTitle="Revenue Data"
                dialogDescription="This is the revenue data for the year 2022"
                dialogContent={
                  <ScrollArea className="h-[70vh] px-5">
                    <SimpleDataTable<TableComparativeReservation>
                      columns={columnsTable3}
                      data={dataTable3}
                    />
                  </ScrollArea>
                }
                dialogCloseText="Close"
              />
            </SimpleChartBoard>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
