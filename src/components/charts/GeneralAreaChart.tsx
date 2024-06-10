import { AreaChart, EventProps } from "@tremor/react";
import { useState } from "react";

interface GeneralAreaChartProps {
  title?: string;
  data: any[];
  index: string;
  stacked?: boolean;
  categories: string[];
  colors: string[] | string;
  showLegend?: boolean;
  curveType?: "step" | "linear" | "natural" | "monotone";
  yAxisWidth?: number;
  showAnimation?: boolean;
  showGradient?: boolean;
  valueFormatter?: (number: number) => string;
  selectable?: boolean;
  customTooltip?: any;
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
  showAnimation,
  showGradient,
  valueFormatter,
  selectable,
  customTooltip,
}: GeneralAreaChartProps) => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <>
      {title && (
        <h3 className="2xl:text-md text-md font-semibold xl:text-lg lg:text-lg md:text-sm">
          {title}
        </h3>
      )}
      <AreaChart
        className={`w-full ${title ? "h-[90%]" : "h-full"} ${
          !showLegend ? "mt-4 h-[85%]" : ""
        }`}
        data={data}
        index={index}
        stack={stacked || false}
        categories={categories}
        colors={Array.isArray(colors) ? colors : [colors]}
        showLegend={showLegend}
        curveType={curveType}
        yAxisWidth={yAxisWidth}
        showAnimation={showAnimation}
        showGradient={showGradient}
        valueFormatter={valueFormatter}
        onValueChange={selectable ? (value) => setValue(value) : undefined}
        intervalType="preserveStartEnd"
        customTooltip={customTooltip}
      />
    </>
  );
};
