import { useState } from "react";
import { BarChart, EventProps } from "@tremor/react";

interface GeneralBarChartProps {
  title?: string;
  data: any[];
  index: string;
  stacked?: boolean;
  categories: string[];
  colors: string[] | string;
  showLegend?: boolean;
  showAnimation?: boolean;
  yAxisWidth?: number;
  valueFormatter?: (number: number) => string;
  selectable?: boolean;
  customTooltip?: any
}

export const GeneralBarChart = ({
  title,
  data,
  index,
  stacked,
  categories,
  colors,
  showLegend = true,
  showAnimation,
  yAxisWidth,
  valueFormatter,
  selectable,
  customTooltip,
}: GeneralBarChartProps) => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <>
      {title && (
        <h3 className="2xl:text-md text-md font-semibold xl:text-lg lg:text-lg md:text-sm">
          {title}
        </h3>
      )}
      <BarChart
        className={`w-full ${title ? "h-[90%]" : "h-full"} ${
          !showLegend ? "mt-4 h-[85%]" : ""
        }`}
        data={data}
        index={index}
        stack={stacked || false}
        categories={categories}
        colors={Array.isArray(colors) ? colors : [colors]}
        showLegend={showLegend}
        showAnimation={showAnimation}
        yAxisWidth={yAxisWidth}
        valueFormatter={valueFormatter}
        onValueChange={selectable ? (value) => setValue(value) : undefined}
        intervalType="preserveStartEnd"
        customTooltip={customTooltip}
      />
    </>
  );
};
