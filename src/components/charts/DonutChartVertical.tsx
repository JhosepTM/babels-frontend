import { DonutChart } from "@tremor/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { badgeColor } from "@/utils/General";
import { Separator } from "@/components/ui/separator";

interface DonutChartVerticalProps {
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
}

export const DonutChartVertical = ({
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
}: DonutChartVerticalProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {title && (
        <h3 className="2xl:text-md text-md font-semibold xl:text-lg lg:text-lg md:text-sm">
          {title}
        </h3>
      )}
      <div>
        <DonutChart
          className="mt-3"
          data={data}
          category={category}
          index={index}
          valueFormatter={valueFormatter}
          colors={Array.isArray(colors) ? colors : [colors]}
          onValueChange={selectable ? (value) => console.log(value) : undefined}
          showAnimation={showAnimation}
        />
      </div>
      <div className="px-5">
        <p className="mt-3 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span className="w-[140px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
            {listTitle}
          </span>
          <span className="w-[55px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
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
    </div>
  );
};
