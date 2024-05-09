import { DonutChart, List, ListItem } from "@tremor/react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DonutChartVerticalProps {
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

const currencyFormatter = (number: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formatted;
};

export const DonutChartVertical = ({
  title,
  listTitle,
  listValue,
  data,
  index,
  category,
  colors,
  valueFormatter,
  selectable,
}: DonutChartVerticalProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {title && (
        <h3 className="2xl:text-tremor-title text-tremor-content-strong xl:text-tremor-title lg:text-tremor-title md:text-tremor-label text-tremor-content dark:text-dark-tremor-content">
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
          colors={colors}
          onValueChange={selectable ? (value) => console.log(value) : undefined}
        />
      </div>
      <div>
        <p className="mt-3 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span className="w-[140px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
            {listTitle}
          </span>
          <span className="w-[140px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
            {listValue}
          </span>
        </p>
        <ScrollArea className="2xl:h-[180px] xl:h-[160px] lg:h-[120px] md:h-[90px]">
          <List className="mt-2">
            {data.map((item) => (
              <ListItem key={item.type} className="space-x-6">
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
                    {currencyFormatter(item.revenue)}
                  </span>
                </div>
              </ListItem>
            ))}
          </List>
        </ScrollArea>
      </div>
    </div>
  );
};
