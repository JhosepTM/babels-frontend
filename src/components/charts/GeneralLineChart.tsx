import { EventProps, LineChart } from "@tremor/react";
import { useState } from "react";

interface GeneralLineChartProps {
  title?: string;
  data: any[];
  index: string;
  stacked?: boolean;
  categories: string[];
  colors: string[] | string;
  showLegend?: boolean;
  showAnimation?: boolean;
  curveType?: "step" | "linear" | "natural" | "monotone";
  yAxisWidth?: number;
  valueFormatter?: (number: number) => string;
  selectable?: boolean;
  customTooltip?: any;
}

export const GeneralLineChart = ({
  title,
  data,
  index,
  categories,
  colors,
  showLegend = true,
  showAnimation,
  curveType = "linear",
  yAxisWidth,
  valueFormatter,
  selectable,
  customTooltip,
}: GeneralLineChartProps) => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <>
      {title && (
        <h3 className="2xl:text-md text-md font-semibold xl:text-lg lg:text-lg md:text-sm">
          {title}
        </h3>
      )}
      <LineChart
        className={`w-full ${title ? "h-[90%]" : "h-full"} ${
          !showLegend ? "mt-4 h-[85%]" : ""
        }`}
        data={data}
        index={index}
        categories={categories}
        colors={Array.isArray(colors) ? colors : [colors]}
        showLegend={showLegend}
        showAnimation={showAnimation}
        curveType={curveType}
        yAxisWidth={yAxisWidth}
        valueFormatter={valueFormatter}
        onValueChange={selectable ? (value) => setValue(value) : undefined}
        intervalType="preserveStartEnd"
        customTooltip={customTooltip}
      />
    </>
  );
};
