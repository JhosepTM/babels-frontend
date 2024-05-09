import { CardInfo } from "@/components/CardInfo";
import { CardInfoItem } from "@/interfaces/CardInfoItem";

interface HorizontalCardsProps {
  cards: CardInfoItem[];
}

export const HorizontalCards = ({ cards }: HorizontalCardsProps) => {
  return (
    <div className="flex justify-center items-center mt-2 mb-3 gap-5">
      {cards.map((card, index) => (
        <CardInfo key={index} item={card} />
      ))}
    </div>
  );
};
