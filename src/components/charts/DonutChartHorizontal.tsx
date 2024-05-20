import { ScrollArea } from "@/components/ui/scroll-area";
import { DonutChart, EventProps, List, ListItem } from "@tremor/react";
import { useState } from "react";

interface DonutChartHorizontalProps {
  title?: string;
  listTitle: string;
  listValue: string;
  data: any[];
  index: string;
  category: string;
  colors: string[];
  valueFormatter?: (number: number) => string;
  selectable?: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
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
  selectable,
}: DonutChartHorizontalProps) => {
  const [value, setValue] = useState<EventProps>(null);

  return (
    <div className="flex flex-col 2xl:p-2 p-0 w-full h-full">
      {title && (
        <h3 className="2xl:text-tremor-title text-tremor-content-strong xl:text-tremor-title lg:text-tremor-title md:text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          {title}
        </h3>
      )}
      <div className="flex justify-between items-center">
        <div>
          <p className="mt-3 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
            <span className="2xl:w-[160px] xl:w-[100px] lg:w-[90px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
              {listTitle}
            </span>
            <span className="2xl:w-[40px] xl:w-[40px] lg:w-[33px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
              {listValue}
            </span>
          </p>
          <ScrollArea className="2xl:h-[130px] xl:h-[120px] lg:h-[120px] md:h-[90px]">
            <List className="mt-2 xl:mr-4 lg:mr-2">
              {data.map((item) => (
                <ListItem
                  key={item.type}
                  className="2xl:w-[200px] xl:w-[140px] lg:w-[120px]"
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span
                      className={classNames(
                        item.color,
                        "h-2.5 w-2.5 shrink-0 rounded-sm"
                      )}
                      aria-hidden={true}
                    />
                    <span className="truncate dark:text-dark-tremor-content-emphasis">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      {item.total}
                    </span>
                  </div>
                </ListItem>
              ))}
            </List>
          </ScrollArea>
        </div>
        <DonutChart
          className="mt-3 w-[140px] h-[140px]"
          data={data}
          index={index}
          category={category}
          colors={colors}
          valueFormatter={valueFormatter}
          onValueChange={selectable ? (value) => setValue(value) : undefined}
        />
      </div>
    </div>
  );
};
