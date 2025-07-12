import Card from "./Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { Sneaker } from "../models/sneaker.model";

interface CardListProps {
  items: Sneaker[];
  isFavorites?: boolean;
}

export default function CardList({
  items,
  isFavorites = false,
}: CardListProps) {
  const [parent] = useAutoAnimate();

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10"
      ref={parent}
    >
      {items.map((item) => (
        <Card
          sneaker={item}
          key={item.id}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          isFavorite={item.isFavorite}
          isAdded={item.isAdded}
          isFavorites={isFavorites}
        />
      ))}
    </div>
  );
}
