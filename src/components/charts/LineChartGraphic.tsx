import { LineChart } from "@tremor/react";

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

const currencyFormatter = (number: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formatted;
};

export const RoomsLineChart = () => {
  return (
    <LineChart
      className="w-full h-full"
      data={chartData}
      index="date"
      categories={["Basico", "Medio", "Gold"]}
      colors={["indigo", "rose", "cyan"]}
      yAxisWidth={65}
      valueFormatter={currencyFormatter}
      onValueChange={(v) => console.log(v)}
    />
  );
};
