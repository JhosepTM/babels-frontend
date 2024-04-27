import { HorizontalCards } from "@/components/HorizontalCards";
import { CardInfoItem } from "@/interfaces/CardInfoItem";

interface SimpleChartBoardProps {
  cardsInfo: CardInfoItem[];
  children: React.ReactNode;
}

export const SimpleChartBoard = ({
  cardsInfo,
  children,
}: SimpleChartBoardProps) => {
  return (
    <div>
      <HorizontalCards cards={cardsInfo} />
      <div className="flex 2xl:justify-between xl:justify-between lg:justify-center md:justify-center flex-wrap 2xl:gap-2 xl:gap-0 lg:gap-7 md:gap-7 2xl:mt-4 mt-2">
        {children}
      </div>
    </div>
  );
};
