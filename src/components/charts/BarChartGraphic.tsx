import { BarChart, EventProps } from "@tremor/react";
import { useState } from "react";

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
  },
  {
    date: "Feb",
    Basico: 15,
    Medio: 12,
    Gold: 6,
  },
  {
    date: "Mar",
    Basico: 25,
    Medio: 8,
    Gold: 7,
  },
  {
    date: "Apr",
    Basico: 10,
    Medio: 15,
    Gold: 7,
  },
  {
    date: "May",
    Basico: 30,
    Medio: 10,
    Gold: 7,
  },
  {
    date: "Jun",
    Basico: 35,
    Medio: 15,
    Gold: 7,
  },
  {
    date: "Jul",
    Basico: 40,
    Medio: 20,
    Gold: 10,
  },
  {
    date: "Aug",
    Basico: 45,
    Medio: 25,
    Gold: 10,
  },
  {
    date: "Sep",
    Basico: 50,
    Medio: 30,
    Gold: 15,
  },
  {
    date: "Oct",
    Basico: 55,
    Medio: 35,
    Gold: 15,
  },
  {
    date: "Nov",
    Basico: 60,
    Medio: 40,
    Gold: 20,
  },
  {
    date: "Dec",
    Basico: 65,
    Medio: 45,
    Gold: 20,
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

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarChartGraphic = () => {
  return (
    <BarChart
      data={chartData}
      index="date"
      categories={["Number of room reservations"]}
      colors={["blue"]}
      intervalType="preserveStartEnd"
      valueFormatter={dataFormatter}
    />
  );
};

export const BarChartOfRoomType = () => {
  return (
    <BarChart
      data={charDataRoomType}
      index="date"
      categories={["Basico", "Medio", "Gold"]}
      colors={["blue", "green", "red"]}
      valueFormatter={dataFormatter}
    />
  );
};

export const BarChartComparative = () => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <>
      <BarChart
        data={charDataComparative}
        index="date"
        categories={["2022", "2023"]}
        colors={["gray", "blue"]}
        onValueChange={(value) => setValue(value)}
      />
      {value && (
        <div className="flex justify-center items-center mt-2">
          <p className="text-lg">
            {value.index}: {value.category}: {value.value}
          </p>
        </div>
      )}
    </>
  );
};
