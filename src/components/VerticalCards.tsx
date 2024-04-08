import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardInfo } from "./CardInfo";

interface VerticalCardsProps {
  cards: CardInfoItem[];
}

export const VerticalCards = ({ cards }: VerticalCardsProps) => {
  return (
    <ScrollArea className="2xl:w-[320px] 2xl:h-[440px] xl:w-[250px] xl:h-[410px] lg:w-[230px] lg:h-[400px] md:w-[160px] md:h-[330px]">
      <div className="flex flex-col items-center justify-center gap-5">
        {cards.map((card, index) => (
          <CardInfo key={index} item={card} />
        ))}
      </div>
    </ScrollArea>
  );
};
