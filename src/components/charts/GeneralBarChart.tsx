import { useState } from "react";
import { BarChart, EventProps } from "@tremor/react";

interface GeneralBarChartProps {
  title?: string;
  data: any[];
  index: string;
  stacked?: boolean;
  categories: string[];
  colors: string[];
  showLegend?: boolean;
  yAxisWidth?: number;
  valueFormatter?: (number: number) => string;
  selectable?: boolean;
}

export const GeneralBarChart = ({
  title,
  data,
  index,
  stacked,
  categories,
  colors,
  showLegend = true,
  yAxisWidth,
  valueFormatter,
  selectable,
}: GeneralBarChartProps) => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <>
      {title && (
        <h3 className="2xl:text-tremor-title text-tremor-content-strong xl:text-tremor-title lg:text-tremor-title md:text-tremor-label">
          {title}
        </h3>
      )}
      <BarChart
        className={`w-full ${title ? "h-[90%]" : "h-full"}`}
        data={data}
        index={index}
        stack={stacked || false}
        categories={categories}
        colors={colors}
        showLegend={showLegend}
        yAxisWidth={yAxisWidth}
        valueFormatter={valueFormatter}
        onValueChange={selectable ? (value) => setValue(value) : undefined}
        intervalType="preserveStartEnd"
      />
    </>
  );
};
