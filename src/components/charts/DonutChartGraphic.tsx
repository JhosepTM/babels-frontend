import { DonutChart, List, ListItem } from "@tremor/react";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = [
  {
    type: "Basico",
    revenue: 1340,
    color: "bg-cyan-500",
  },
  {
    type: "Medio",
    revenue: 1200,
    color: "bg-blue-500",
  },
  {
    type: "Gold",
    revenue: 1000,
    color: "bg-indigo-500",
  },
  {
    type: "Platinum",
    revenue: 800,
    color: "bg-purple-500",
  },
  {
    type: "Diamond",
    revenue: 600,
    color: "bg-pink-500",
  },
  {
    type: "Silver",
    revenue: 400,
    color: "bg-red-500",
  },
  {
    type: "Bronze",
    revenue: 200,
    color: "bg-orange-500",
  },
];

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

export const DonutChartGraphic = () => {
  return (
    <div className="w-full h-full flex flex-col justify-evenly">
      <h3 className="2xl:text-tremor-title xl:text-tremor-title lg:text-tremor-title md:text-tremor-label text-tremor-content dark:text-dark-tremor-content">
        Revenue by Room Type
      </h3>
      <div>
        <DonutChart
          className="mt-3"
          data={data}
          category="revenue"
          index="type"
          valueFormatter={currencyFormatter}
          colors={["cyan", "blue", "indigo"]}
        />
        <p className="mt-3 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Room Type</span>
          <span>Revenue</span>
        </p>
        <ScrollArea className="2xl:h-[40%] xl:h-[30%] lg:h-[35%] md:h-[20%]">
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
