import type { Sneaker } from "../models/sneaker.model";
import Card from "./Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface CardListProps {
  sneakers: Sneaker[];
  addToFavorites: (item: Sneaker) => void;
  addToCart: (item: Sneaker) => void;
}

export default function CardList({
  sneakers,
  addToFavorites,
  addToCart,
}: CardListProps) {
  const [parent] = useAutoAnimate();

  return (
    <div className="grid grid-cols-4 gap-5 mt-10" ref={parent}>
      {sneakers.map((sneaker) => (
        <Card
          key={sneaker.id}
          sneaker={sneaker}
          title={sneaker.title}
          price={sneaker.price}
          imageUrl={sneaker.imageUrl}
          isFavorite={sneaker.isFavorite}
          addToFavorites={addToFavorites}
          addToCart={addToCart}
          isAdded={sneaker.isAdded}
        />
      ))}
    </div>
  );
}
