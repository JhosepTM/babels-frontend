import { CarouselTools } from "./CarouselTools";
import { Card } from "@/components/ui/card";
import { AreaChart } from "@tremor/react";
import { ToolItem } from "@/interfaces/ToolItem";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { MdSsidChart } from "react-icons/md";
import { AiOutlineDotChart } from "react-icons/ai";
import { TbBrandCashapp } from "react-icons/tb";
import { MdPersonAddAlt } from "react-icons/md";
import { VerticalCards } from "./VerticalCards";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { useNavigate } from "react-router-dom";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
  {
    date: "Jul 22",
    SemiAnalysis: 3490,
    "The Pragmatic Engineer": 1982,
  },
  {
    date: "Aug 22",
    SemiAnalysis: 2903,
    "The Pragmatic Engineer": 2012,
  },
  {
    date: "Sep 22",
    SemiAnalysis: 2643,
    "The Pragmatic Engineer": 2342,
  },
  {
    date: "Oct 22",
    SemiAnalysis: 2837,
    "The Pragmatic Engineer": 2473,
  },
  {
    date: "Nov 22",
    SemiAnalysis: 2954,
    "The Pragmatic Engineer": 3848,
  },
  {
    date: "Dec 22",
    SemiAnalysis: 3239,
    "The Pragmatic Engineer": 3736,
  },
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
  /*{
    title: "Subscriptions",
    mainContent: "+2350",
    secondaryContent: "+80.1% from last month",
    icon: MdPersonAddAlt,
  },*/
];

const dataFormatter = (number: number | bigint) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export const GraphicsMain = () => {
  const navigate = useNavigate();

  const tools: ToolItem[] = [
    {
      title: "Bar Chart",
      img: FaChartBar,
      onClick: () => {
        navigate("/bookings");
      },
    },
    {
      title: "Pie Chart",
      img: FaChartPie,
      onClick: () => {},
    },
    {
      title: "Line Chart",
      img: FaChartLine,
      onClick: () => {},
    },
    {
      title: "Ssid Chart",
      img: MdSsidChart,
      onClick: () => {},
    },
    {
      title: "Dot Chart",
      img: AiOutlineDotChart,
      onClick: () => {},
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-[95%] 2xl:h-[540px] xl:h-[420px] lg:h-[380px] md:h-[280px] items-start">
        <div className="flex flex-col justify-center items-center">
          <Card className="shadow-slate-300 p-5">
            <AreaChart
              className="2xl:w-[1040px] 2xl:h-[480px] xl:w-[680px] xl:h-[360px] lg:w-[580px] lg:h-[330px] md:w-[460px] md:h-[235px]"
              data={chartdata}
              index="date"
              categories={["SemiAnalysis", "The Pragmatic Engineer"]}
              colors={["indigo", "rose"]}
              valueFormatter={dataFormatter}
              onValueChange={(v) => console.log(v)}
            />
          </Card>
        </div>
        <VerticalCards cards={cardsInfo} />
      </div>
      <CarouselTools tools={tools} />
    </div>
  );
};
