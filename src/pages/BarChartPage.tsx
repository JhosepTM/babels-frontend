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
import {
  BarChartComparative,
  BarChartGraphic,
  BarChartOfRoomType,
} from "@/components/charts/BarChartGraphic";

import { TableReservation } from "@/components/table/TableReservation";

import { TbBrandCashapp } from "react-icons/tb";
import { MdPersonAddAlt } from "react-icons/md";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { SimpleChartBoard } from "../components/charts/SimpleChartBoard";
import {
  TableComparativeReservation,
  TableItemReservation,
} from "@/interfaces/TableReservation";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
          Number of Reservations
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
      <Card className="2xl:w-[1335px] xl:w-[1150px] md:w-[800px] 2xl:h-[720px] xl:h-[690px] lg:h-[1400px] md:h-[1350px] shadow-lg p-10">
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
          <TabsContent value="reservations-month">
            <SimpleChartBoard cardsInfo={cardsInfo}>
              <Card className="2xl:w-[55%] xl:w-[49%] lg:w-[100%] md:w-[100%] 2xl:h-[380px] xl:h-[370px] pr-10 pt-5 pb-5">
                <BarChartGraphic />
              </Card>
              <ScrollArea className="2xl:w-[43%] xl:w-[49%] lg-w[100%]">
                <div className="2xl:w-[100%] xl:w-[100%] 2xl:h-[380px] xl:h-[370px]">
                  <TableReservation<TableItemReservation>
                    columns={columnsTable}
                    data={dataTable}
                  />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </SimpleChartBoard>
          </TabsContent>
          <TabsContent value="reservations-room-type">
            <SimpleChartBoard cardsInfo={cardsInfo}>
              <Card className="2xl:w-[55%] xl:w-[53%] lg:w-[100%] md:w-[100%] 2xl:h-[380px] xl:h-[370px] pr-10 pt-5 pb-5">
                <BarChartOfRoomType />
              </Card>
              <ScrollArea className="2xl:w-[43%] xl:w-[45%] lg-w[100%]">
                <div className="2xl:w-[100%] xl:w-[100%] 2xl:h-[380px] xl:h-[370px]">
                  <TableReservation<any>
                    columns={columnsTable2}
                    data={dataTable2}
                  />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </SimpleChartBoard>
          </TabsContent>
          <TabsContent value="comparative-year">
            <SimpleChartBoard cardsInfo={cardsInfo}>
              <Card className="2xl:w-[55%] xl:w-[46%] lg:w-[100%] md:w-[100%] 2xl:h-[380px] xl:h-[370px] pr-10 pt-5 pb-5">
                <BarChartComparative />
              </Card>
              <ScrollArea className="2xl:w-[43%] xl:w-[52%] lg-w[100%]">
                <div className="2xl:w-[100%] xl:w-[100%] 2xl:h-[380px] xl:h-[370px]">
                  <TableReservation<TableComparativeReservation>
                    columns={columnsTable3}
                    data={dataTable3}
                  />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </SimpleChartBoard>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
