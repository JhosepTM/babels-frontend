import { Card } from "@/components/ui/card";
import { SimpleChartBoard } from "../components/charts/SimpleChartBoard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { TbBrandCashapp } from "react-icons/tb";
import { MdPersonAddAlt } from "react-icons/md";
import { DonutChartGraphic } from "@/components/charts/DonutChartGraphic";
import { RoomsLineChart } from "../components/charts/LineChartGraphic";

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

export const RevenueChartPage = () => {
  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1335px] xl:w-[1150px] md:w-[800px] 2xl:h-[720px] xl:h-[690px] lg:h-[1400px] md:h-[1350px] shadow-lg p-10">
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
        <div>
          <SimpleChartBoard cardsInfo={cardsInfo}>
            <Card className="2xl:w-[67%] xl:w-[30%] lg:w-[100%] md:w-[100%] 2xl:h-[430px] xl:h-[410px] pt-3 pb-3 px-5">
              <RoomsLineChart />
            </Card>
            <Card className="2xl:w-[30%] xl:w-[30%] lg:w-[100%] md:w-[100%] 2xl:h-[430px] xl:h-[410px] pt-3 pb-3 px-5">
              <DonutChartGraphic />
            </Card>
          </SimpleChartBoard>
        </div>
      </Card>
    </div>
  );
};
