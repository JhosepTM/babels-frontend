import { BarChart, EventProps } from "@tremor/react";
import { useState } from "react";

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

export const BarChartComparative = () => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <>
      <BarChart
        className="w-full h-full"
        data={charDataComparative}
        index="date"
        categories={["2022", "2023"]}
        colors={["gray", "blue"]}
        onValueChange={(value) => setValue(value)}
      />
    </>
  );
};
