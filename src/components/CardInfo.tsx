import { Card } from "@/components/ui/card";

import { CardInfoItem } from "@/interfaces/CardInfoItem";

interface CardInfoProps {
  item: CardInfoItem;
}

export const CardInfo = ({ item }: CardInfoProps) => {
  return (
    <Card className="2xl:w-[18vw] xl:w-[19vw] lg:w-[18vw] md:w-[16vw] 2xl:h-[130px] xl:h-[120px] lg:h-[110px] md:pb-2 shadow-slate-300">
      <div className="flex items-center justify-between 2xl:p-5 xl:p-5 lg:p-3 md:p-2 2xl:pb-3 xl:pb-2 md:pb-1">
        <p className="2xl:text-sm text-md font-semibold md:font-normal md:text-sm">
          {item.title}
        </p>
        <item.icon className="text-2xl opacity-50" />
      </div>
      <div className="">
        <h2 className="px-10 2xl:text-3xl xl:text-2xl lg:text-2xl md:font-semibold 2xl:font-semibold xl:font-semibold lg:font-semibold tracking-tight pl-5 pr-5">
          {item.mainContent}
        </h2>
        <p className="2xl:text-sm text-xs text-slate-400 2xl:pl-5 xl:pl-5 lg:pl-5 md:pl-3 2xl:pr-0 xl:pr-0 lg:pr-0 md:pr-3">
          {item.secondaryContent}
        </p>
      </div>
    </Card>
  );
};
