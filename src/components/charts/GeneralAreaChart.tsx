import { AreaChart, EventProps } from "@tremor/react";
import { useState } from "react";

interface GeneralAreaChartProps {
  title?: string;
  data: any[];
  index: string;
  stacked?: boolean;
  categories: string[];
  colors: string[];
  showLegend?: boolean;
  curveType?: "step" | "linear" | "natural" | "monotone";
  yAxisWidth?: number;
  valueFormatter?: (number: number) => string;
  selectable?: boolean;
}

export const GeneralAreaChart = ({
  title,
  data,
  index,
  stacked,
  categories,
  colors,
  showLegend = true,
  curveType = "linear",
  yAxisWidth,
  valueFormatter,
  selectable,
}: GeneralAreaChartProps) => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <>
      {title && (
        <h3 className="2xl:text-tremor-title text-tremor-content-strong xl:text-tremor-title lg:text-tremor-title md:text-tremor-label">
          {title}
        </h3>
      )}
      <AreaChart
        className={`w-full ${title ? "h-[90%]" : "h-full"} ${
          !showLegend ? "mt-2 h-[85%]" : ""
        }`}
        data={data}
        index={index}
        stack={stacked || false}
        categories={categories}
        colors={colors}
        showLegend={showLegend}
        curveType={curveType}
        yAxisWidth={yAxisWidth}
        valueFormatter={valueFormatter}
        onValueChange={selectable ? (value) => setValue(value) : undefined}
        intervalType="preserveStartEnd"
      />
    </>
  );
};
