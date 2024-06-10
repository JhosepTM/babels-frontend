import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardInfo } from "./CardInfo";
import { CardInfoSkeleton } from "./CardInfoSkeleton";

interface VerticalCardsProps {
  cards: CardInfoItem[];
  skeleton?: boolean;
}

export const VerticalCards = ({ cards, skeleton }: VerticalCardsProps) => {
  if (skeleton) {
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <CardInfoSkeleton />
        <CardInfoSkeleton />
        <CardInfoSkeleton />
        <CardInfoSkeleton />
      </div>
    );
  }
  return (
    <ScrollArea className="2xl:w-[370px] 2xl:h-[590px] xl:w-[260px] xl:h-[410px] lg:w-[230px] lg:h-[380px] md:w-[160px] md:h-[305px]">
      <div className="flex flex-col items-center justify-center gap-5">
        {cards.map((card, index) => (
          <CardInfo key={index} item={card} />
        ))}
      </div>
    </ScrollArea>
  );
};
