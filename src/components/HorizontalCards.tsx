import { CardInfo } from "@/components/CardInfo";
import { CardInfoItem } from "@/interfaces/CardInfoItem";
import { CardInfoSkeleton } from "./CardInfoSkeleton";

interface HorizontalCardsProps {
  cards: CardInfoItem[];
  skeleton?: boolean;
}

export const HorizontalCards = ({
  cards,
  skeleton = false,
}: HorizontalCardsProps) => {
  if (skeleton) {
    return (
      <div className="flex justify-center items-center mt-2 mb-3 gap-5">
        <CardInfoSkeleton />
        <CardInfoSkeleton />
        <CardInfoSkeleton />
        <CardInfoSkeleton />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-2 mb-3 gap-5">
      {cards.map((card, index) => (
        <CardInfo key={index} item={card} />
      ))}
    </div>
  );
};
