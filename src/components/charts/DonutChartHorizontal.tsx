import { ScrollArea } from "@/components/ui/scroll-area";
import { DonutChart, EventProps, List, ListItem } from "@tremor/react";
import { useState } from "react";
import { DonutCustomTooltip } from "./DonutCustomTooltip";
import { Separator } from "@/components/ui/separator";
import { badgeColor, formatter } from "@/utils/General";

interface DonutChartHorizontalProps {
  title?: string;
  listTitle: string;
  listValue: string;
  data: any[];
  index: string;
  category: string;
  colors: string[] | string;
  valueFormatter?: (number: number) => string;
  formatList?: boolean;
  selectable?: boolean;
  showAnimation?: boolean;
  customTooltip?: boolean;
}

export const DonutChartHorizontal = ({
  title,
  listTitle,
  listValue,
  data,
  index,
  category,
  colors,
  valueFormatter,
  formatList,
  selectable,
  showAnimation,
  customTooltip,
}: DonutChartHorizontalProps) => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <div className="flex flex-col 2xl:p-2 p-0 w-full h-full">
      {title && (
        <h3 className="2xl:text-md text-md font-semibold xl:text-lg lg:text-lg md:text-sm">
          {title}
        </h3>
      )}
      <div className="flex justify-between items-center">
        <div className="2xl:block xl:block lg:block md:hidden">
          <p className="mt-3 mx-2 flex items-center justify-between font-semibold text-tremor-label text-tremor-content dark:text-dark-tremor-content">
            <span className="2xl:w-[160px] xl:w-[100px] lg:w-[90px] md:w-[70px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
              {listTitle}
            </span>
            <span className="2xl:w-[40px] xl:w-[40px] lg:w-[33px] md:w-[30px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
              {listValue}
            </span>
          </p>
          <ScrollArea className="2xl:h-[130px] xl:h-[120px] lg:h-[120px] md:h-[90px]">
            <div className="my-4 mx-2">
              {data.map((item, keyV) => {
                return (
                  <>
                    <div
                      key={keyV}
                      className="flex items-center justify-between mt-2 text-tremor-label text-tremor-content dark:text-dark-tremor-content"
                    >
                      <div className="flex space-x-3">
                        <span
                          className={`bg-${colors[keyV]} ${badgeColor(
                            "rounded"
                          )}`}
                          aria-hidden={true}
                        />
                        <p className="text-sm 2xl:w-[100px] xl:w-[80px] lg:w-[90px] md:w-[70px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                          {item[index]}
                        </p>
                      </div>
                      <p className="text-sm ">
                        {formatList && valueFormatter
                          ? valueFormatter(item[category])
                          : item[category]}
                      </p>
                    </div>
                    <Separator />
                  </>
                );
              })}
            </div>
          </ScrollArea>
        </div>
        <DonutChart
          className="mt-3 2xl:h-[140px] xl:h-[140px] lg:h-[140px] md:h-[90px]"
          data={data}
          index={index}
          category={category}
          colors={Array.isArray(colors) ? colors : [colors]}
          valueFormatter={valueFormatter}
          onValueChange={selectable ? (value) => setValue(value) : undefined}
          customTooltip={
            customTooltip
              ? (props: any) => DonutCustomTooltip(props, formatter)
              : undefined
          }
          showAnimation={showAnimation}
        />
      </div>
    </div>
  );
};
