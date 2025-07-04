import type { Sneakers } from "../models/sneakers.model";
import Card from "./Card";

interface CardListProps {
  sneakers: Sneakers[];
}

export default function CardList({ sneakers }: CardListProps) {
  return (
    <div className="grid grid-cols-4 gap-5 mt-10">
      {sneakers.map((sneaker) => (
        <Card
          key={sneaker.id}
          title={sneaker.title}
          price={sneaker.price}
          imageUrl={sneaker.imageUrl}
        />
      ))}
    </div>
  );
}
