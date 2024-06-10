import { BarList } from "@tremor/react";

interface GeneralBarListProps {
  title: string;
  data: BarListItem[];
  color?: string;
  sortOrder?: "ascending" | "descending";
  valueFormatter?: (number: number) => string;
  showAnimation?: boolean;
}

export const GeneralBarList = ({
  title,
  data,
  color,
  sortOrder,
  valueFormatter,
  showAnimation = false,
}: GeneralBarListProps) => {
  const formattedData = data.map((item) => ({
    ...item,
    name: item.name,
    value: item.value,
  }));

  return (
    <>
      {title && (
        <h3 className="2xl:text-md text-md font-semibold xl:text-lg lg:text-lg md:text-sm">
          {title}
        </h3>
      )}
      <BarList
        className="w-full"
        data={formattedData}
        color={color}
        sortOrder={sortOrder}
        valueFormatter={valueFormatter}
        showAnimation={showAnimation}
      />
    </>
  );
};
