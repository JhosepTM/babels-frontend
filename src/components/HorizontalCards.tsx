import { CardInfo } from "@/components/CardInfo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardInfoItem } from "@/interfaces/CardInfoItem";

interface HorizontalCardsProps {
  cards: CardInfoItem[];
}

export const HorizontalCards = ({ cards }: HorizontalCardsProps) => {
  return (
    <ScrollArea className="2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[100%] whitespace-nowrap">
      <div className="flex justify-center items-center mt-2 mb-3 gap-5">
        {cards.map((card, index) => (
          <CardInfo key={index} item={card} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
